import { SPRITE_DATA } from "./hero-sprite-data";

// All positions use a 512-unit circle. One clock controls the actor and the icons.
const SIZE = 512;
const FLOOR = 450;
const CELL = 512;
const HEAD_WIDTH = 150;
const TIMING = {
  peek: 150,
  withdraw: 1550,
  walk: 2000,
  turn: 3500,
  sit: 4320,
  seated: 5170,
  reach: 5450,
  ready: 6000,
  laptop: 6300,
  catch: 7020,
  lower: 7180,
  settled: 7920,
};

type Sheet = keyof typeof SPRITE_DATA;
type Pose = { sheet: Sheet; frame: number };
type Placement = { x: number; top: number; feet: number };
type Rig = { left: number; headEnd: number; neck: number; scale: number; bodyScale: number; shear: number };
const SHEETS = Object.keys(SPRITE_DATA) as Sheet[];
const HANDS = {
  "receive-a": [[276, 330], [277, 326], [268, 286], [218, 284], [195, 267], [190, 253]],
  "receive-b": [[208, 250], [194, 275], [181, 295], [240, 315], [233, 328], [214, 325]],
};

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const progress = (time: number, start: number, end: number) => clamp((time - start) / (end - start));
const smooth = (n: number) => n * n * (3 - 2 * n);
const mix = (a: number, b: number, n: number) => a + (b - a) * n;
const easeOut = (n: number) => 1 - Math.pow(1 - n, 3);
const sequence = (name: "walk" | "turn" | "sit" | "receive", frame: number): Pose => ({
  sheet: `${name}-${frame < 6 ? "a" : "b"}`,
  frame: Math.min(11, Math.max(0, frame)) % 6,
});

const scenes = new Map<HTMLElement, HeroScene>();

class HeroScene {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private images: HTMLImageElement[] = [];
  private sheets = new Map<Sheet, HTMLImageElement>();
  private icons: Animation[] = [];
  private lifetime = new AbortController();
  private motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  private resize: ResizeObserver;
  private visibility: IntersectionObserver;
  private loader: MutationObserver;
  private width = SIZE;
  private ratio = 1;
  private time = 0;
  private end = 8500;
  private previous = 0;
  private raf = 0;
  private visible = false;
  private ready = false;
  private disposed = false;

  constructor(private media: HTMLElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.resize = new ResizeObserver(() => this.measure());
    this.resize.observe(media);
    this.visibility = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.syncPlayback();
    }, { threshold: 0.25 });
    this.visibility.observe(media);
    this.loader = new MutationObserver(() => {
      if (!document.getElementById("page-loader")) {
        this.loader.disconnect();
        this.syncPlayback();
      }
    });
    if (document.getElementById("page-loader")) {
      this.loader.observe(document.body, { childList: true, subtree: true });
    }
    const options = { signal: this.lifetime.signal };
    document.addEventListener("visibilitychange", () => this.syncPlayback(), options);
    window.addEventListener("resize", () => this.measure(), options);
    this.motion.addEventListener("change", () => this.syncPlayback(), options);
    void this.load();
  }

  private async load() {
    try {
      const loadImage = async (src: string) => {
        const image = new Image();
        image.src = src;
        await image.decode();
        return image;
      };
      const [sheets, props] = await Promise.all([
        Promise.all(SHEETS.map(async (name) => [name, await loadImage(`/img/portfolio_img/hero-v3/${name}.webp`)] as const)),
        Promise.all(["chair", "laptop"].map((name) => loadImage(`/img/portfolio_img/hero-v3/${name}.webp`))),
      ]);
      if (this.disposed) return;
      this.sheets = new Map(sheets);
      this.images = props;
      this.ready = true;
      this.createIcons();
      this.media.classList.add("is-scene-ready");
      this.measure();
      this.syncPlayback();
    } catch (error) {
      // Keep the server-rendered illustration and icons usable on asset failure.
      console.warn("Could not initialize the hero animation:", error);
      this.dispose();
    }
  }

  private createIcons() {
    const items = this.media.querySelectorAll<HTMLElement>(".hero__orbit-item");
    this.end = Math.max(8500, TIMING.laptop + 260 + items.length * 85 + 1400);
    this.icons = Array.from(items, (item, index) => {
      const x = parseFloat(item.style.getPropertyValue("--orbit-x")) - 50;
      const y = parseFloat(item.style.getPropertyValue("--orbit-y")) - 50;
      const animation = item.animate([
        { opacity: 0, transform: `translate(-50%, -50%) translate(${x * 5}px, ${y * 5}px) rotate(${index % 2 ? 115 : -115}deg) scale(.3)`, offset: 0 },
        { opacity: 1, offset: 0.25 },
        { opacity: 1, transform: "translate(-50%, -50%) translateY(-5px) rotate(-4deg) scale(1.06)", offset: 0.8 },
        { opacity: 1, transform: "translate(-50%, -50%)", offset: 1 },
      ], {
        duration: 1400,
        delay: TIMING.laptop + 260 + index * 85,
        easing: "cubic-bezier(.16, 1, .3, 1)",
        fill: "both",
      });
      animation.pause();
      animation.currentTime = 0;
      return animation;
    });
  }

  private measure() {
    const rect = this.media.getBoundingClientRect();
    if (!rect.width) return;
    const edge = this.media.closest(".hero")!.getBoundingClientRect().right;
    const width = Math.max(rect.width, edge - rect.left);
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    this.width = width / rect.width * SIZE;
    this.ratio = rect.width / SIZE * dpr;
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${rect.height}px`;
    if (this.ready) this.draw(this.time);
  }

  private syncPlayback() {
    if (!this.ready || this.disposed) return;
    this.stop();
    if (this.motion.matches) {
      this.time = this.end;
      this.render();
      return;
    }
    const playing = this.visible && !document.hidden && !document.getElementById("page-loader");
    this.media.classList.toggle("is-scene-playing", playing);
    if (playing && this.time < this.end) this.raf = requestAnimationFrame(this.tick);
  }

  private tick = (now: number) => {
    if (this.previous) this.time = Math.min(this.end, this.time + now - this.previous);
    this.previous = now;
    this.render();
    if (this.time < this.end) this.raf = requestAnimationFrame(this.tick);
    else this.raf = 0;
  };

  private render() {
    this.draw(this.time);
    this.icons.forEach((animation) => { animation.currentTime = this.time; });
    this.media.dataset.scenePhase = this.time < TIMING.walk ? "peek"
      : this.time < TIMING.turn ? "walk"
      : this.time < TIMING.sit ? "turn"
      : this.time < TIMING.seated ? "sit"
      : this.time < TIMING.reach ? "seated"
      : this.time < TIMING.ready ? "reach"
      : this.time < TIMING.laptop ? "waiting"
      : this.time < TIMING.catch ? "laptop"
      : this.time < TIMING.lower ? "catch"
      : this.time < TIMING.settled ? "lower" : "complete";
  }

  private draw(time: number) {
    const ctx = this.ctx;
    ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
    ctx.clearRect(0, 0, this.width, SIZE);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // The chair never travels with the actor. A small compression follows contact.
    const contact = progress(time, TIMING.seated - 150, TIMING.seated + 250);
    const compression = Math.sin(contact * Math.PI) * 3;
    const chair = this.images[0];
    const chairHeight = 190 * chair.naturalHeight / chair.naturalWidth;
    ctx.drawImage(chair, 207, FLOOR - chairHeight + compression, 190, chairHeight - compression);

    if (time < TIMING.walk) {
      if (time >= TIMING.peek) this.drawPeek(time);
      return;
    }

    let pose: Pose;
    const placement: Placement = { x: 238, top: 130, feet: 219 };
    if (time < TIMING.turn) {
      const p = smooth(progress(time, TIMING.walk, TIMING.turn));
      const start = this.width + 115;
      const distance = (start - 230) * p;
      pose = sequence("walk", Math.floor(distance / 11) % 12);
      placement.x = start - distance;
      placement.top = 78 - Math.abs(Math.sin(distance / 66 * Math.PI)) * 2;
      const { head, feet } = SPRITE_DATA[pose.sheet][pose.frame];
      placement.feet = placement.x + ((feet[0] + feet[1]) / 2 - (head[0] + head[1]) / 2) * HEAD_WIDTH / (head[1] - head[0]);
    } else if (time < TIMING.sit) {
      const p = progress(time, TIMING.turn, TIMING.sit);
      pose = sequence("turn", Math.floor(p * 12));
      placement.x = mix(230, 238, smooth(p)) - Math.sin(p * Math.PI) * 8;
      placement.top = 78 + Math.sin(p * Math.PI) * 2;
      placement.feet = 228 - smooth(p) * 9;
    } else if (time < TIMING.seated) {
      const p = progress(time, TIMING.sit, TIMING.seated);
      pose = sequence("sit", Math.floor(p * 12));
      placement.top = mix(78, 130, smooth(p));
      placement.x = 238 - Math.sin(p * Math.PI) * 7;
    } else if (time < TIMING.reach) {
      pose = sequence("receive", 0);
      placement.top += Math.sin(progress(time, TIMING.seated, TIMING.reach) * Math.PI) * 3;
    } else if (time < TIMING.ready) {
      pose = sequence("receive", Math.floor(progress(time, TIMING.reach, TIMING.ready) * 6));
    } else if (time < TIMING.catch) {
      pose = sequence("receive", 5);
    } else if (time < TIMING.lower) {
      pose = sequence("receive", 6);
      // Both arms absorb the incoming weight before lowering it to his lap.
      placement.top += Math.sin(progress(time, TIMING.catch, TIMING.lower) * Math.PI) * 2;
    } else if (time < TIMING.settled) {
      pose = sequence("receive", 6 + Math.floor(progress(time, TIMING.lower, TIMING.settled) * 6));
    } else {
      pose = sequence("receive", 11);
    }

    const rig = this.getRig(pose, placement);
    this.drawActor(pose, rig);
    if (time >= TIMING.laptop) this.drawLaptop(time, pose, rig);
  }

  private getRig(pose: Pose, placement: Placement): Rig {
    const { bounds, head, feet } = SPRITE_DATA[pose.sheet][pose.frame];
    const scale = HEAD_WIDTH / (head[1] - head[0] + 1);
    const left = placement.x - (head[0] + head[1]) / 2 * scale;
    const headEnd = bounds[1] + 190;
    const neck = placement.top + 190 * scale;
    const bodyHeight = bounds[1] + bounds[3] - headEnd;
    return {
      left, headEnd, neck, scale,
      bodyScale: (FLOOR - neck) / bodyHeight,
      shear: (placement.feet - left - (feet[0] + feet[1]) / 2 * scale) / bodyHeight,
    };
  }

  private point(rig: Rig, x: number, y: number) {
    const bodyY = y - rig.headEnd;
    return {
      x: rig.left + x * rig.scale + Math.max(0, bodyY) * rig.shear,
      y: rig.neck + bodyY * (bodyY < 0 ? rig.scale : rig.bodyScale),
    };
  }

  private drawActor(pose: Pose, rig: Rig) {
    const image = this.sheets.get(pose.sheet)!;
    const sx = pose.frame % 3 * CELL;
    const sy = Math.floor(pose.frame / 3) * CELL;
    // Preserve face proportions, then register the connected torso to the floor.
    // Continuous geometry removes source-sheet drift without dissolves or blur.
    this.ctx.drawImage(image, sx, sy, CELL, rig.headEnd,
      rig.left, rig.neck - rig.headEnd * rig.scale, CELL * rig.scale, rig.headEnd * rig.scale);
    this.ctx.save();
    this.ctx.transform(rig.scale, 0, rig.shear, rig.bodyScale, rig.left, rig.neck);
    this.ctx.drawImage(image, sx, sy + rig.headEnd, CELL, CELL - rig.headEnd,
      0, 0, CELL, CELL - rig.headEnd);
    this.ctx.restore();
  }

  private drawPeek(time: number) {
    const enter = smooth(progress(time, TIMING.peek, TIMING.peek + 650));
    const leave = smooth(progress(time, TIMING.withdraw, TIMING.walk - 50));
    const reveal = enter * (1 - leave);
    let frame = Math.min(4, Math.floor(reveal * 5));
    if (time > 1190 && time < 1320) frame = 5;
    const { bounds, feet } = SPRITE_DATA.peek[frame];
    const scale = 0.72;
    const footX = this.width + 93 + (1 - reveal) * 80;
    const left = footX - (feet[0] + feet[1]) / 2 * scale;
    const ctx = this.ctx;
    ctx.save();
    // Full connected figure leaning around a VERTICAL edge. No neck crop:
    // the viewport naturally hides his shoulder, torso and feet on the right.
    ctx.drawImage(this.sheets.get("peek")!, frame % 3 * CELL, Math.floor(frame / 3) * CELL, CELL, CELL,
      left, FLOOR - (bounds[1] + bounds[3]) * scale, CELL * scale, CELL * scale);
    ctx.restore();
  }

  private drawLaptop(time: number, pose: Pose, rig: Rig) {
    const ctx = this.ctx;
    const handPositions = HANDS[pose.sheet as keyof typeof HANDS];
    const [hx, hy] = handPositions[pose.frame];
    // Carry the laptop continuously between the drawn hand poses, including
    // the small cushioning motion at contact, rather than jumping each frame.
    const frame = time < TIMING.catch ? 5
      : time < TIMING.lower ? mix(5, 6, smooth(progress(time, TIMING.catch, TIMING.lower)))
      : mix(6, 11, progress(time, TIMING.lower, TIMING.settled));
    const anchor = (index: number) => {
      const sample = sequence("receive", index);
      const [x, y] = HANDS[sample.sheet as keyof typeof HANDS][sample.frame];
      return this.point(this.getRig(sample, { x: 238, top: 130, feet: 219 }), x, y);
    };
    const a = anchor(Math.floor(frame));
    const b = anchor(Math.ceil(frame));
    const hand = { x: mix(a.x, b.x, frame % 1), y: mix(a.y, b.y, frame % 1) };
    const width = 183;
    const height = width * this.images[1].naturalHeight / this.images[1].naturalWidth;
    const target = { x: hand.x - width * 0.76, y: hand.y - height * 0.86 };
    const p = progress(time, TIMING.laptop, TIMING.catch);
    const travel = easeOut(p);
    // An arc into open palms, followed by the hands carrying the laptop down.
    const x = mix(this.width + 90, target.x, travel);
    const y = mix(25, target.y, travel) - Math.sin(p * Math.PI) * 65;
    ctx.save();
    ctx.globalAlpha = clamp(p * 6);
    ctx.translate(x, y);
    ctx.rotate(-0.45 * (1 - travel));
    const scale = mix(0.35, 1, travel);
    ctx.scale(scale, scale);
    ctx.drawImage(this.images[1], 0, 0, width, height);
    ctx.restore();

    if (time >= TIMING.lower && pose.frame >= 4) {
      // Once fingers turn over the keyboard, the near hand belongs in front.
      ctx.save();
      const corner = this.point(rig, hx - 34, hy - 23);
      ctx.beginPath();
      ctx.roundRect(corner.x, corner.y, 80 * rig.scale, 42 * rig.bodyScale, 9);
      ctx.clip();
      this.drawActor(pose, rig);
      ctx.restore();
    }
  }

  private stop() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.previous = 0;
    this.media.classList.remove("is-scene-playing");
  }

  dispose() {
    this.disposed = true;
    this.stop();
    this.lifetime.abort();
    this.resize.disconnect();
    this.visibility.disconnect();
    this.loader.disconnect();
    this.icons.forEach((animation) => animation.cancel());
    this.media.classList.remove("is-scene-ready");
    scenes.delete(this.media);
  }
}

export function initHeroScene() {
  // A persisted hero keeps its progress; removed heroes release their observers.
  for (const [media, scene] of scenes) if (!media.isConnected) scene.dispose();
  document.querySelectorAll<HTMLElement>(".hero__media").forEach((media) => {
    if (scenes.has(media)) return;
    const canvas = media.querySelector<HTMLCanvasElement>(".hero__scene-canvas");
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) scenes.set(media, new HeroScene(media, canvas, ctx));
  });
}

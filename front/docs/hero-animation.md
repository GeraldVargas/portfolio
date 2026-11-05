# Animación del hero

La versión activa usa **54 poses nuevas de 512 × 512 px** en nueve hojas PNG. El navegador carga sus versiones WebP sin pérdida, más la silla y la laptop independientes, desde `public/img/portfolio_img/hero-v3/` (aproximadamente 5,4 MiB). La animación anterior ya no se importa ni se ejecuta.

## Secuencia

- 0–2 s: el personaje completo se inclina detrás del borde derecho; el borde oculta su cuerpo y deja ver la cara, sin cortar horizontalmente el cuello.
- 2–3,5 s: entra caminando con las manos vacías.
- 3,5–4,32 s: gira hacia la silla y vuelve a orientarse para sentarse.
- 4,32–5,17 s: flexiona las piernas y se sienta; la silla permanece en su lugar.
- 5,45–6 s: levanta los antebrazos y abre las manos; espera antes de que aparezca la laptop.
- 6,3–7,02 s: la laptop llega en arco hasta las manos.
- 7,02–7,92 s: amortigua la recepción, baja la laptop y coloca la mano sobre el teclado.

`src/scripts/hero-scene.ts` controla una única línea de tiempo. `hero-sprite-data.ts` registra cabeza y pies entre dibujos; los movimientos de posición y la laptop se interpolan entre fotogramas. La escena espera al loader y a ser visible, se pausa fuera de pantalla, admite movimiento reducido y conserva una imagen estática de respaldo. Al terminar deja de redibujar.

## Recursos

Generados con `image_gen` integrado, a partir del personaje original. En `hero-v3/`: `peek`, `walk-a/b`, `turn-a/b`, `sit-a/b`, `receive-a/b`, `chair` y `laptop`. Los PNG de poses se conservan como fuentes de alta resolución; los WebP de poses usan compresión sin pérdida.

Los prompts de las primeras referencias se conservan debajo como historial de generación; no describen la hoja de poses que carga ahora la web. Los prompts adicionales v3 de caminar y girar están al final.

### Prompt del personaje

```text
Use case: stylized-concept. Asset type: a production animation sprite atlas for an existing portfolio hero.
Image 1 is the character identity and rendering style reference, NOT a scene to duplicate. Preserve exactly his recognizable chibi appearance: enormous round head, tousled black side swept hair, black rectangular glasses, large dark eyes, black over-ear headphones with red ring, navy zip hoodie over black t-shirt, slate jeans, white sneakers. Clean polished 2D shaded cartoon, sharp dark outlines, as in the reference.
Create ONE TRANSPARENT sprite sheet with EXACTLY 24 isolated FULL-BODY poses arranged in a strict uniform grid of 6 COLUMNS and 4 ROWS, read left to right. Landscape canvas 3072 by 2048 preferred, each square cell 512 by 512. No drawn grid, no labels. The same camera, same character head size, same clothing and lighting throughout. Every character fits within its own cell with generous clear margins, center at 50% horizontal and shoes at 90% cell height. No cropping, no overlap. Absolute true alpha transparent background, no checkerboard, no ground or cast shadows.
CRITICAL: ONLY THE PERSON in every cell. NO CHAIR, NO LAPTOP, NO FURNITURE, NO PROPS in any cell. Hands are empty. Even seated poses are pantomime sitting in an invisible chair, with upper legs horizontal to the left and feet on the ground. Keep exactly the same head diameter and body proportions in standing and sitting poses; seated head naturally lower than standing head.
Rows are an animation sequence:
Row 1 cells 1-6: smooth walking cycle toward screen LEFT seen in left-facing three-quarter/profile view. Six genuinely distinct successive footfalls: left contact, left down, passing, right contact, right down, passing. Gentle counter-swing of empty hands. Head stays stable.
Row 2 cells 1-6: progressively TURNING THE WHOLE BODY while standing, in six small consecutive angle increments: left three-quarter facing viewer; left full profile; left rear three-quarter; full BACK VIEW of hair and hoodie; right rear three-quarter; right full profile. Feet pivot, shoulders and hips rotate together. Real different drawings, not mirroring.
Row 3 cells 1-6: complete the pivot and prepare to sit: right front three-quarter, front view, left front three-quarter, left-facing three-quarter with a tiny backward step, knees slightly bent with hips back, knees more bent with torso leaning forward. Empty hands reach slightly toward an invisible seat. Head lowers gradually. 
Row 4 cells 1-6: successive controlled sitting motion facing screen LEFT three-quarter with face visible: half squat, deeper squat, hips just above invisible seat, full seated position, seated slight settling lean, final relaxed seated position smiling toward viewer. Last three poses have thighs horizontal, lower legs down and white sneakers at the same floor. His hands hover together above his lap ready for a laptop that will be separately composited later.
Prioritize accurate anatomical continuity, consistent scale and identity, clean separated alpha sprites. Do not repeat the reference's laptop or chair. This is an animation asset, not a storyboard with scenery.
```

### Prompt de la silla

```text
Use case: precise-object-edit. Asset type: isolated transparent furniture layer for animation.
Reference image shows a seated cartoon developer. Create ONLY his empty BLACK OFFICE CHAIR, with all of its previously occluded parts fully drawn. Remove the person and laptop completely. Preserve the same polished 2D cartoon style, dark outlines, black padded backrest and cushioned seat, armrests, central metal gas lift and five-spoke wheeled base. Same three-quarter viewpoint: the chair faces toward the LOWER LEFT of the picture, so its backrest is on the upper RIGHT and open seat faces lower left. Keep the chair perfectly upright. Full chair visible, generous clear margins, centered. Actual transparent alpha background, no floor, no shadow, no text, no grid, no person, no laptop. This is the chair that the original character will sit on, so match his original chair's perspective and proportions precisely.
```

### Prompt de la laptop

```text
Use case: precise-object-edit. Asset type: isolated transparent laptop layer for animation.
Reference image shows a cartoon developer holding an open black HP laptop. Create ONLY this OPEN BLACK LAPTOP as an isolated object, fully drawn and cleaned up. Remove the person, hands, chair, and all background. Match exactly the reference's polished 2D cartoon rendering and thick dark outlines. Same camera perspective and orientation: viewer sees the black OUTER BACK of the upright lid, with a small silver HP mark in its middle, and a narrow glimpse of the keyboard base extending to the RIGHT behind the lid, where the original hands were. The lid is on the LEFT, slanting slightly back, laptop base almost horizontal. Full laptop visible centered with generous clear margins. Actual transparent alpha background, no floor, no glow, no cast shadow, no person, no hands, no chair.
```


## Prompts adicionales v3: caminar y girar

La versión v3 conserva los PNG originales de alta resolución en public/img/portfolio_img/hero-v3/ y carga versiones WebP lossless en el navegador, manteniendo la transparencia y el detalle. Son 54 poses distribuidas en nueve hojas de 1536 × 1024 px: cada hoja tiene 3 columnas × 2 filas, con celdas de 512 × 512 px. La secuencia cuenta con 6 poses para asomarse, 12 para caminar, 12 para girar, 12 para sentarse y 12 para recibir la laptop.

Los atlas de caminar y girar se generaron con image_gen integrado. Cada segunda hoja usa la primera como referencia para mantener la identidad, la escala y la continuidad. Los siguientes prompts se conservan completos, tal como se enviaron a la herramienta; los ajustes de encuadre y alineación para la animación se realizan por separado.

### Caminar: hoja A

```text
Use case: identity-preserve. Asset type: production PNG sprite atlas, walking animation sheet A of 2. Input image 1 is the character identity/style reference; input image 2 is the original character reference. Generate exactly SIX isolated full-body animation sprites of THIS SAME character walking toward the LEFT, arranged strictly 3 columns by 2 rows on one landscape 1536 x 1024 canvas, each invisible grid cell 512 x 512. This sheet contains phases 0, 1, 2, 3, 4, 5 of a twelve-phase walk cycle in reading order. Use true transparent RGBA background, zero opacity between sprites; no visible backdrop, no gradient, no ground shadows, no rim glow, no gray aura. Preserve precisely the character's identity and rendering: chibi young man, tousled black hair, black rectangular glasses, large brown eyes, black over-ear headphones with narrow red ring, navy zip hoodie over black shirt, blue-gray jeans, white low-top sneakers. Clean sharply antialiased illustration, same outline weight and subtle cel-shading as reference. Hands empty. NO laptop, NO chair, NO accessories or text. Anatomically connected complete body; never sever or crop head, shoes or hands. Consistent fixed camera in three-quarter LEFT view, chest slightly toward camera but nose and walking direction left; do not rotate between poses. Every sprite same scale: full standing height about 425 pixels, same head diameter about 180 pixels, horizontal pelvis center x=256 within each cell; bottom of grounded foot y=475 within every cell. Keep large transparent margins. Natural gentle walking, small successive changes suitable for smooth playback: phase 0 left foot heel contacts ahead toward left, right foot behind on toes; phase 1 body lowers slightly as left foot plants and rear right foot lifts; phase 2 left leg supports body as bent right knee swings forward under hips; phase 3 right foot passes left support leg, heel raised; phase 4 torso rises subtly, right leg extending toward next contact; phase 5 right heel almost touching ahead, left foot pushing off behind. Arms swing gently opposite corresponding legs, relaxed hands, mild body weight shifts, tiny 3-6 pixel vertical head bob only. Render every phase distinctly with precise foot support, no running or exaggerated strides. This sheet must be immediately usable as animation sprites: consistent character proportions, consistent framing, no drawn grid lines, no labels, no extra versions or duplicate characters inside a cell.
```

### Caminar: hoja B

```text
Use case: identity-preserve. Asset type: production PNG sprite atlas, walking animation sheet B of 2. Input image 1 is the NEW preceding walk-cycle sheet A: preserve its exact character design, camera, dimensions and cell alignment. Input image 2 is original character identity reference. Generate exactly SIX isolated full-body animation sprites of THIS SAME character walking toward the LEFT, arranged strictly 3 columns by 2 rows on one landscape 1536 x 1024 canvas, each invisible grid cell 512 x 512. This sheet contains phases 6,7,8,9,10,11 of a twelve-phase walk cycle in reading order: the OPPOSITE leg step from image 1, continuing naturally after its bottom-right frame and leading back to its top-left frame. Use genuine transparent RGBA background, zero opacity outside character silhouettes. NO background, floor, shadows, halos, glow or gradient. Preserve character identity and crisp illustration exactly: tousled black hair, black rectangular glasses, large brown eyes, black over-ear headphones with narrow red ring, navy zip hoodie over black shirt, blue-gray jeans, white low-top sneakers. Same clean antialiased lines and cel shading. All hands empty, NO laptop, NO chair, NO extra objects or labels. Full connected body, no cropping. Consistent fixed three-quarter LEFT camera, nose and walk direction left, chest slightly toward camera, no rotation. Every sprite identical scale and proportions to image 1, head same dimensions, pelvis x=256 of cell, grounded sneaker bottom y=475 in each cell, generous clear margin. Small consecutive gentle-walk poses: phase6 RIGHT heel contacts ahead to left, left foot behind on toes; phase7 weight lowers onto right planted foot while left rear foot lifts; phase8 right leg supports while bent LEFT knee swings beneath hips; phase9 left foot passes right support leg, left heel raised; phase10 body rises subtly as LEFT leg extends forward toward contact; phase11 left heel almost touches ahead while RIGHT foot pushes off behind, matching smoothly to phase0 of reference. Natural anatomically coherent alternating arm counter-swing: when RIGHT leg forward the LEFT arm is forward, then gradual reversal. Relaxed hands, no stiff mannequin posture, small weight shift and subtle head bob. IMPORTANT: these are the second half of one walk cycle, not the same left-leg step repeated, and all six sprites remain in place within their cells. No visible grid, no text, no additional characters.
```

### Girar: hoja A

```text
Use case: identity-preserve.
Asset type: production PNG animation sprite sheet for a portfolio hero. Edit/reinterpret the supplied character references into six tightly registered sequential animation frames.
Input image 1: canonical full-body character, proportions, outfit and rendering reference. Input image 2: canonical face and sharp linework reference only. REMOVE every background, chair and laptop from the new output.
Create ONE landscape image, 1536 x 1024 pixels, exactly 3 columns by 2 rows, six equal invisible 512 x 512 cells. Read order left-to-right, top-to-bottom. No grid lines, no labels. Truly transparent alpha everywhere outside the character, including between legs and fingers. Do not draw a checkerboard or shadow backdrop.
Subject in every cell: exactly the same friendly chibi male programmer from the references, tousled jet black hair, square black glasses, large brown-black eyes, black over-ear headphones with a red ring, open dark navy zip hoodie over black shirt, blue-grey jeans, white low-top sneakers. Full intact body from crown to soles; crisp detailed drawing, not blurry. Head-to-body ratio and outfit exactly like the full body character atlas. Hands empty. No laptop, no chair, no furniture, no objects.
Registration: each cell has center x=256, shoe soles aligned to local y=475, hair crown around local y=65; constant approx 410-pixel standing height, identical scale and camera. Keep full character safely inside each cell. Same warm front-left lighting, smooth cel shading and dark fine outlines as reference. No cast shadow.
Animation action: a natural gentle pivot to glance at a chair behind him, not a 360 turn. Starting facing screen-left in a front-left three-quarter stance, he turns his head slightly before his shoulders, shifts his weight and pivots feet, ending almost back-facing while still oriented somewhat to screen-left. Keep hands hanging loosely near hips with subtle counter-motion.
Six small consecutive poses:
1. Front-left three-quarter standing neutral, face and both eyes clearly visible, feet naturally planted, arms relaxed.
2. Head turns about 15 degrees further toward screen-left while shoulders lag, weight moves gently to right foot.
3. Clear left profile, one eye and nose profile visible, shoulders follow the head, heel begins small pivot.
4. Left back three-quarter, only a sliver of left cheek visible, hood becomes visible, feet pivot 15 degrees further.
5. Back-left view, face almost hidden, both shoulders turning gently, one heel lifted a tiny amount then landing.
6. Near rear view, torso at back-left 165 degrees relative to initial front direction, head glancing slightly over his left shoulder, feet settled.
Crucial: six true different gradual natural poses, same exact character, small changes, no duplicate pose, no growth/shrink, no camera zoom, no deformation, no walking forward, no dramatic gestures, no cropping. Render transparent clean PNG.
```

### Girar: hoja B

```text
Use case: identity-preserve.
Asset type: production PNG animation sprite sheet, continuation B of supplied sheet A.
Input image 1 is sheet A: preserve its exact character identity, proportions, rendering, scale, registration and outfit. In particular, start with a near-copy of its final bottom-right back-left standing pose, then pivot BACK along the same short arc toward screen-left front-three-quarter orientation. This is not a turn continuing through the right-hand side; do not show right-facing profile. Input image 2 is the original canonical reference for identity only.
Create ONE landscape image, exactly 1536 x 1024 pixels, with exactly 3 columns by 2 rows, six equal invisible 512 x 512 cells; read left-to-right then top-to-bottom. No visible grid, borders or labels. Truly transparent alpha outside character and in gaps, with no drawn backdrop or checkerboard.
Same exact friendly chibi male programmer in all cells: tousled jet black hair, black square glasses, big brown-black eyes, black headphones with red ring, dark navy open zip hoodie over black shirt, blue-grey jeans, white low sneakers. Full intact body, empty hands. No chair, laptop, furniture, icons or other objects.
Constant camera and scale: exactly match sheet A scale and placement, body centered at local x256, shoe soles at local y488, crown around local y15. Do not resize or change head/body ratio. All clothing silhouettes consistent with A. Crisp detailed shaded illustration; soft studio light from same direction. Transparent clean silhouette, no shadows outside silhouette.
Movement is a gentle natural reverse pivot followed by a tiny backward positioning step before sitting on an invisible chair. Lead with head, shoulders follow, hips and feet counter-rotate naturally. Feet remain under body; no forward walk. Every pose different and smoothly progressing.
Six chronological frames:
1. Near rear view just like sheet A final pose; back-left view, head glances toward screen-left, hands relaxed.
2. Back-left three-quarter, shoulders beginning to turn back toward screen-left, tiny planted-foot pivot; only sliver of cheek.
3. Left profile now, nose to screen-left, glasses visible in profile; hips lag slightly, rear heel lifts.
4. Left front-three-quarter again, face visible and head looking slightly down toward the seating position, weight shifts.
5. Same front-left three-quarter orientation, tiny half-step backward toward an unseen chair, one foot set 10pixels behind the other, knees relaxed, hands begin drifting just slightly forward for balance.
6. Stable front-left three-quarter stance ready to sit, both soles planted at common baseline, knees softly bent only a little, torso leans forward very slightly, elbows relaxed with empty palms loosely facing down near hips.
Keep torso standing high throughout; this is preparation for sitting, not a deep squat or seated pose. Natural anatomical hands. No drastic expressions, no head tilt exaggeration, no camera turn, no full revolution. Exactly six frames with small believable changes. Output transparent PNG.
```


## Verificación final

Compilación Astro y TypeScript estricto correctos. Revisión en Chrome de las 12 etapas, escritorio y móvil DPR 2: sin excepciones de JavaScript ni desbordamiento horizontal. Verificados pausa/reanudación, movimiento reducido e imagen de respaldo al bloquear un recurso. Las capturas temporales están en .tmp/hero-qa/deterministic-v3/.

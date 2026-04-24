import marioBg from '../assets/mario-bg.png'
import pipe from '../assets/pipe.png'
import cracks from '../assets/cracks.png'
import profile from '../assets/profile.jpg'

function HeroSection({ sectionRef, crackOverlayRef, blackOverlayRef }) {
  return (
    <section className="world world-hero" ref={sectionRef} aria-label="Mario hero world">
      <img
        className="hero-bg"
        src={marioBg}
        loading="lazy"
        alt="Mario world styled background"
      />

      <img className="pipe left" src={pipe} loading="lazy" alt="Green pipe left" />
      <img className="pipe right" src={pipe} loading="lazy" alt="Green pipe right" />

      <div className="hero-content">
        <img
          className="profile-photo"
          src={profile}
          loading="lazy"
          alt="// TODO: replace with real profile photo"
        />
        <h1>// TODO: ALEX DEV</h1>
        <p>
          // TODO: Replace this short bio with your own.
          <br />
          // TODO: Keep this text under two lines.
        </p>

        <div className="social-row">
          <a href="#" className="pixel-btn github" aria-label="GitHub profile">
            GitHub
          </a>
          <a href="#" className="pixel-btn linkedin" aria-label="LinkedIn profile">
            LinkedIn
          </a>
        </div>
      </div>

      <div className="crack-overlay" ref={crackOverlayRef}>
        <img src={cracks} loading="lazy" alt="Cracked screen overlay" />
        <span className="crack-fragment f1" aria-hidden="true"></span>
        <span className="crack-fragment f2" aria-hidden="true"></span>
        <span className="crack-fragment f3" aria-hidden="true"></span>
        <span className="crack-fragment f4" aria-hidden="true"></span>
      </div>

      <div className="black-transition" ref={blackOverlayRef} aria-hidden="true"></div>
    </section>
  )
}

export default HeroSection

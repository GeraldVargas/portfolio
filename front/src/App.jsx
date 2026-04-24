import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const appRef = useRef(null)
  const heroRef = useRef(null)
  const crackOverlayRef = useRef(null)
  const blackOverlayRef = useRef(null)
  const projectsRef = useRef(null)
  const bezelRef = useRef(null)
  const projectsUiRef = useRef(null)
  const contactRef = useRef(null)

  const [cardCountPerPage, setCardCountPerPage] = useState(window.innerWidth < 768 ? 1 : 2)

  useEffect(() => {
    const onResize = () => {
      setCardCountPerPage(window.innerWidth < 768 ? 1 : 2)
    }

    onResize()
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: 'DOMContentLoaded,load,resize',
      })
      ScrollTrigger.normalizeScroll({
        allowNestedScroll: true,
        lockAxis: false,
        type: 'touch,wheel,pointer',
      })

      gsap.set(crackOverlayRef.current, { autoAlpha: 0, scale: 0.88 })
      gsap.set('.crack-fragment', { x: 0, y: 0, autoAlpha: 0 })
      gsap.set(blackOverlayRef.current, { autoAlpha: 0 })
      gsap.set(bezelRef.current, { scale: 0.4, yPercent: 12 })
      gsap.set(projectsUiRef.current, { autoAlpha: 0, y: 30 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to('.hero-bg', { yPercent: 14, ease: 'none' }, 0)
        .to(crackOverlayRef.current, { autoAlpha: 1, scale: 1.3, ease: 'none' }, 0.22)
        .to(
          '.crack-fragment',
          {
            autoAlpha: 1,
            x: (index) => (index % 2 === 0 ? -80 : 80),
            y: (index) => (index < 2 ? -60 : 80),
            rotate: (index) => (index % 2 === 0 ? -24 : 24),
            ease: 'none',
            stagger: 0.04,
          },
          0.32,
        )
        .to(blackOverlayRef.current, { autoAlpha: 1, ease: 'none' }, 0.72)

      gsap
        .timeline({
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top top',
            end: '+=220%',
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        .to(
          bezelRef.current,
          {
            scale: window.innerWidth < 768 ? 0.96 : 1.2,
            yPercent: -8,
            ease: 'none',
          },
          0,
        )
        .to(
          projectsUiRef.current,
          {
            autoAlpha: 1,
            y: 0,
            ease: 'none',
          },
          0.48,
        )

      gsap.fromTo(
        '.contact-form',
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.9,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        },
      )
    }, appRef)

    return () => context.revert()
  }, [])

  return (
    <div className="scroll-container" ref={appRef}>
      <HeroSection
        sectionRef={heroRef}
        crackOverlayRef={crackOverlayRef}
        blackOverlayRef={blackOverlayRef}
      />
      <ProjectsSection
        sectionRef={projectsRef}
        bezelRef={bezelRef}
        projectsUiRef={projectsUiRef}
        cardCountPerPage={cardCountPerPage}
      />
      <ContactSection sectionRef={contactRef} />
    </div>
  )
}

export default App

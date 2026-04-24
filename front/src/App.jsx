import { useEffect, useState } from 'react'
import './App.css'

const experience = [
  {
    company: 'EMPRESA A',
    role: 'DESARROLLADOR FULL-STACK',
    fighter: 'RYU',
  },
  {
    company: 'EMPRESA B',
    role: 'INGENIERO DE SOFTWARE',
    fighter: 'KEN',
  },
]

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function App() {
  const [apiStatus, setApiStatus] = useState({ loading: true, ok: false, message: '' })
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch('/api/health')
        if (!response.ok) {
          throw new Error('Backend no disponible')
        }

        const data = await response.json()
        setApiStatus({ loading: false, ok: true, message: data.message })
      } catch (_error) {
        setApiStatus({
          loading: false,
          ok: false,
          message: 'No se pudo conectar con el backend',
        })
      }
    }

    checkApi()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)
      const rawProgress = window.scrollY / maxScroll
      setScrollProgress(clamp(rawProgress, 0, 1))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const crackProgress = clamp((scrollProgress - 0.08) / 0.42, 0, 1)
  const ruptureProgress = clamp((scrollProgress - 0.5) / 0.34, 0, 1)
  const dustOpacity = clamp((scrollProgress - 0.3) / 0.2, 0, 1)

  return (
    <main className="folio-page">
      <section className="scroll-stage" aria-label="Portfolio cinematic transition section">
        <div
          className="scene-sticky"
          style={{
            '--crack-progress': crackProgress,
            '--rupture-progress': ruptureProgress,
            '--dust-opacity': dustOpacity,
          }}
        >
          <section className="mario-world">
            <div className="mario-sky"></div>
            <div className="cloud c1"></div>
            <div className="cloud c2"></div>
            <div className="cloud c3"></div>
            <div className="profile-panel">
              <div className="wood-sign">HOME</div>
              <div className="avatar-card">
                <div className="avatar-circle">A</div>
                <div>
                  <p className="avatar-name">ALEX</p>
                  <p className="avatar-role">DESARROLLADOR WEB (React, Node.js)</p>
                </div>
              </div>
            </div>

            <div className="pipes">
              <div className="pipe left"></div>
              <div className="pipe right"></div>
              <div className="vine v1"></div>
              <div className="vine v2"></div>
            </div>

            <div className="floating-items">
              <span className="brick">?</span>
              <span className="coin"></span>
              <span className="brick">?</span>
            </div>

            <div className="mario-runner" aria-hidden="true"></div>
            <div className="hills"></div>
          </section>

          <div className="crack-layer" aria-hidden="true">
            <span className="crack c1"></span>
            <span className="crack c2"></span>
            <span className="crack c3"></span>
            <span className="crack c4"></span>
            <span className="crack c5"></span>
          </div>

          <div className="fracture" aria-hidden="true">
            <span className="debris d1"></span>
            <span className="debris d2"></span>
            <span className="debris d3"></span>
          </div>

          <div className="dust-cloud" aria-hidden="true"></div>

          <section className="street-world">
            <div className="dojo">
              <span className="lantern"></span>
              <p className="dojo-title">Ryu&apos;s Dojo</p>
              <div className="fighter ryu">RYU</div>
            </div>

            <div className="night-market">
              <p className="market-title">Asian Night Market</p>
              <div className="fighter ken">KEN</div>
            </div>

            <aside className="experience-panel">
              <p className="experience-header">EXPERIENCIA PROFESIONAL</p>
              {experience.map((item) => (
                <article className="experience-item" key={item.company}>
                  <div className="fighter-badge">{item.fighter}</div>
                  <div>
                    <p className="company">{item.company}</p>
                    <p className="role">{item.role}</p>
                  </div>
                  <span className="sf-logo">Street Fighter</span>
                </article>
              ))}
            </aside>
          </section>
        </div>
      </section>

      <section className="status-bar" role="status" aria-live="polite">
        <span className={`dot ${apiStatus.ok ? 'ok' : 'error'}`}></span>
        <strong>API:</strong>
        {apiStatus.loading ? ' Verificando...' : ` ${apiStatus.message}`}
        <span className="scroll-hint">Desplaza la pagina para intensificar la ruptura</span>
      </section>
    </main>
  )
}

export default App

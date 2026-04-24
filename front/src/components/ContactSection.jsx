import { useMemo, useState } from 'react'
import pacmanMaze from '../assets/pacman-maze.png'
import powerPellet from '../assets/power-pellet.png'

function ContactSection({ sectionRef }) {
  const [isEating, setIsEating] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const formId = useMemo(() => ({
    fullName: 'full-name',
    github: 'github-username',
    email: 'email-address',
    phone: 'phone-whatsapp',
    message: 'message',
  }), [])

  const onSubmit = (event) => {
    event.preventDefault()
    setIsEating(true)
    setIsSent(false)

    window.setTimeout(() => {
      setIsEating(false)
      setIsSent(true)
    }, 1200)
  }

  return (
    <section className="world world-contact" ref={sectionRef} aria-label="Pac-Man contact world">
      <img className="contact-bg" src={pacmanMaze} loading="lazy" alt="Pac-Man maze background" />

      <div className={`pacman-track ${isEating ? 'eat' : ''}`} aria-hidden="true">
        <span className="pacman"></span>
        <span className="pellet"></span>
      </div>

      <svg className="ghost ghost-red" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M8 28a24 24 0 1 1 48 0v28l-8-6-8 6-8-6-8 6-8-6-8 6V28z" fill="#ff4d6d" />
        <circle cx="24" cy="28" r="6" fill="#fff" />
        <circle cx="40" cy="28" r="6" fill="#fff" />
      </svg>

      <svg className="ghost ghost-pink" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M8 28a24 24 0 1 1 48 0v28l-8-6-8 6-8-6-8 6-8-6-8 6V28z" fill="#ff8fab" />
        <circle cx="24" cy="28" r="6" fill="#fff" />
        <circle cx="40" cy="28" r="6" fill="#fff" />
      </svg>

      <form className="contact-form" onSubmit={onSubmit}>
        <h2>CONTACT</h2>

        <label htmlFor={formId.fullName}>Full name</label>
        <input id={formId.fullName} type="text" placeholder="John Pixel" required />

        <label htmlFor={formId.github}>GitHub username</label>
        <input id={formId.github} type="text" placeholder="octocat" required />

        <label htmlFor={formId.email}>Email address</label>
        <input id={formId.email} type="email" placeholder="name@example.com" required />

        <label htmlFor={formId.phone}>Phone / WhatsApp</label>
        <input id={formId.phone} type="tel" placeholder="+1 555 123 456" required />

        <label htmlFor={formId.message}>Message</label>
        <textarea
          id={formId.message}
          placeholder="Tell me about your project..."
          rows={4}
          required
        ></textarea>

        <button type="submit" className="send-btn">
          <img src={powerPellet} loading="lazy" alt="Power pellet icon" />
          SEND
        </button>

        {isSent ? <p className="success-msg">Message sent. Pac-Man ate the pellet.</p> : null}
      </form>
    </section>
  )
}

export default ContactSection

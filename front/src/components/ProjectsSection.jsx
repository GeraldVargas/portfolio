import { useMemo, useState } from 'react'
import arcadeRoom from '../assets/arcade-room.png'
import arcadeBezel from '../assets/arcade-bezel.png'

const projectData = [
  {
    name: '// TODO: Project 01',
    description: '// TODO: replace with project description line one. line two here.',
    stack: ['React', 'Node'],
  },
  {
    name: '// TODO: Project 02',
    description: '// TODO: replace with project description line one. line two here.',
    stack: ['Vite', 'Express'],
  },
  {
    name: '// TODO: Project 03',
    description: '// TODO: replace with project description line one. line two here.',
    stack: ['MongoDB', 'JWT'],
  },
  {
    name: '// TODO: Project 04',
    description: '// TODO: replace with project description line one. line two here.',
    stack: ['PostgreSQL', 'Prisma'],
  },
  {
    name: '// TODO: Project 05',
    description: '// TODO: replace with project description line one. line two here.',
    stack: ['Socket.io', 'Redis'],
  },
  {
    name: '// TODO: Project 06',
    description: '// TODO: replace with project description line one. line two here.',
    stack: ['Stripe', 'CI/CD'],
  },
]

function ProjectsSection({ sectionRef, bezelRef, projectsUiRef, cardCountPerPage }) {
  const [page, setPage] = useState(0)

  const pageSize = Math.max(1, cardCountPerPage)
  const pageCount = Math.ceil(projectData.length / pageSize)

  const visibleProjects = useMemo(() => {
    const start = page * pageSize
    return projectData.slice(start, start + pageSize)
  }, [page, pageSize])

  const onPrev = () => setPage((prev) => (prev - 1 + pageCount) % pageCount)
  const onNext = () => setPage((prev) => (prev + 1) % pageCount)

  return (
    <section className="world world-projects" ref={sectionRef} aria-label="Street Fighter projects world">
      <img
        className="projects-bg"
        src={arcadeRoom}
        loading="lazy"
        alt="Street Fighter style arcade room"
      />

      <div className="arcade-stage">
        <img
          className="arcade-bezel"
          ref={bezelRef}
          src={arcadeBezel}
          loading="lazy"
          alt="Arcade cabinet bezel"
        />

        <div className="projects-ui" ref={projectsUiRef}>
          <header>
            <h2>PROJECT SELECT</h2>
            <span>
              {page + 1}/{pageCount}
            </span>
          </header>

          <div className="projects-grid">
            {visibleProjects.map((project) => (
              <article key={project.name} className="project-card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="card-actions">
                  <a href="#" className="btn play" aria-label="Open project preview">
                    Play
                  </a>
                  <a href="#" className="btn code" aria-label="Open GitHub source code">
                    Code
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="dpad-nav" aria-label="Project navigation">
            <button type="button" onClick={onPrev} aria-label="Previous projects">
              ◀
            </button>
            <button type="button" onClick={onNext} aria-label="Next projects">
              ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection

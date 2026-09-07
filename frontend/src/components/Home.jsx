import { useState } from 'react'
import { ArrowUpRight, ArrowDown, Download } from 'lucide-react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile, projects } from '../data/PortfolioData'
import './Home.css'

export default function Home() {
  const [selected, setSelected] = useState(0)
  const featured = projects.slice(0, 3)
  const project = featured[selected]

  return (
    <section id="home" className="field-home">
      <div className="field-topline"><span>THE PERSONAL FIELD NOTES OF</span><span>KANPUR, INDIA / OPEN TO OPPORTUNITIES</span></div>
      <div className="field-layout">
        <div className="field-intro">
          <p className="field-kicker"><span /> FULL STACK DEVELOPMENT & AI / ML</p>
          <h1>Govind<br /><span>Singh<span className="field-period">.</span></span></h1>
          <div className="field-statement"><span className="field-asterisk" aria-hidden="true">✳</span><h2>Curiosity in.<br />Useful things out.</h2></div>
          <p className="field-description">I connect thoughtful interfaces, reliable backends, and AI to turn everyday problems into things people can use. Currently learning by building.</p>
          <div className="field-actions"><a className="field-primary" href="#projects">Explore my work <ArrowUpRight size={19} /></a><a className="field-resume" href="/Govind_Singh_Resume.pdf" download><Download size={16} /> Resume</a></div>
          <div className="field-socials"><span>FIND ME ELSEWHERE</span>{profile.github && <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>}{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>}{profile.email && <a href={`mailto:${profile.email}`} aria-label="Email Govind"><FiMail /></a>}</div>
        </div>
        <div className="field-workbench">
          <div className="field-index-heading"><span>BUILD LOG</span><span>SELECTED EXPLORATIONS / 01—03</span></div>
          <div className="field-project-tabs" role="group" aria-label="Choose a featured project">{featured.map((item, index) => <button key={item.title} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.title.split(/\s*-\s*/)[0]}<ArrowUpRight size={16} /></button>)}</div>
          <article className="field-project" aria-live="polite" aria-atomic="true">
            <div className="field-preview"><img key={project.image} src={project.image} alt={`${project.title} application preview`} /><span className="field-stamp">BUILT WITH<br />CURIOSITY ↗</span></div>
            <div className="field-project-body"><p className="field-kicker">EXPERIMENT / 0{selected + 1}</p><h3>{project.title.split(/\s*-\s*/)[0]}</h3><p>{project.subtitle}</p><div className="field-tags">{project.tech.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}</div><div className="field-project-links">{project.live && <a href={project.live} target="_blank" rel="noreferrer">Open project <ArrowUpRight size={17} /></a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer">Source <FiGithub size={16} /></a>}</div></div>
          </article>
          <p className="field-note"><span aria-hidden="true">↳</span> Ideas become clearer when you build them.</p>
        </div>
      </div>
      <div className="field-bottom"><span>01 / INTRODUCTION</span><span>DESIGN → DEVELOP → LEARN → REPEAT</span><a href="#projects">KEEP EXPLORING <ArrowDown size={15} /></a></div>
    </section>
  )
}

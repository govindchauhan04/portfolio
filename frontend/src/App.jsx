import AnimatedBackground from './components/AnimatedBackground'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import AdditionalSkills from './components/AdditionalSkills'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Resume from './components/Resume'
import Feedback from './components/Feedback'
import Footer from './components/Footer'
import GovindAI from './components/GovindAI'
import DSALab from './components/DSALab'
import LearningNotes from './components/LearningNotes'
import Videos from './components/Videos'

export default function App() {
  return (
    <div className="min-h-screen font-body text-ink">
      <AnimatedBackground />
      <Navbar />
      <main>
        <Home />
        <Projects />
        <TechStack />
        <AdditionalSkills />
        <Videos />
        <Education />
        <Certificates />
        <Resume />
        <Feedback />
        <LearningNotes />
        <DSALab />
      </main>
      <Footer />
      {/* cspell:disable-next-line */}
      <GovindAI />
    </div>
  )
}

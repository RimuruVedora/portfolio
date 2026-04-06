import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import FloatingChat from './components/FloatingChat';
import './index.css';

function App() {
  return (
    <div id="main-scroller" className="relative h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">
      <Navbar />
      <Home />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <FloatingChat />
    </div>
  );
}

export default App;

import About from './components/About';
import Welcome from './components/Welcome';
import Header from './components/Layout/Header';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Certifical from './components/Certifical';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Welcome />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Certifical />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

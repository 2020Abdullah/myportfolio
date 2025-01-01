import React from 'react'
import Welcome from './Home/Welcome';
import About from './Home/About';
import Services from './Home/Services';
import Skills from './Home/Skills';
import Certifical from './Home/Certifical';
import Projects from './Home/Projects';
import Contact from './Home/Contact';

const HomeComponent = () => {
  return (
    <div className='homePage'>
      <Welcome />
      <About />
      <Services />
      <Skills />
      <Certifical />
      <Projects />
      <Contact />
    </div>
  )
}

export default HomeComponent
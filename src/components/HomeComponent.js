import React, { useEffect, useState } from 'react'
import Welcome from './Home/Welcome';
import Services from './Home/Services';
import Skills from './Home/Skills';
import Certifical from './Home/Certifical';
import Projects from './Home/Projects';
import Contact from './Home/Contact';
import HeaderComponent from './Layout/HeaderComponent';
import FooterComponent from './Layout/FooterComponent';

const HomeComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timer for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Cleanup timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='homePage'>
      <div className={loading ? 'loader-wrapper' : 'loader-wrapper hidden'}>
          <div className="loader"></div>
      </div>
      <div className='portfolio-content'>
            <HeaderComponent />
            <Welcome />
            <Services />
            <Skills />
            <Certifical />
            <Projects />
            <Contact />
            <FooterComponent />
      </div>
    </div>
  )
}



export default HomeComponent
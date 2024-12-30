import React from 'react'
import { Container } from 'react-bootstrap'

const About = () => {
  return (
    <section id="About">
        <h2 className="section-title text-center">About me</h2>
        <Container>
            <div className="About-content wow slideInRight" data-wow-duration="2s">
                <h2 className="About-title">I'm Abdalla mohamad and Web Developer</h2>
                <p className="lead">
                    Innovative and dedicated Web Developer with extensive experience
                    in designing, developing, and deploying custom web solutions.
                    Skilled in both front-end and back-end development using HTML,
                    CSS, JavaScript, React, PHP, Laravel, and MySQL. Proven ability to
                    deliver creative and functional websites, web applications, and
                    platforms tailored to meet client needs. Passionate about improving
                    user experiences and ensuring high performance for web systems.
                </p>
                <button className="btn btn-success"><a target="_blank" rel='noopener noreferrer' href="https://drive.google.com/file/d/1G2RLzPe2u4xpC5kBGBVqS1UWaDTmEVbp/view?usp=sharing">download cv</a></button>
            </div>
        </Container>
    </section>
  )
}

export default About
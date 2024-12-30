import React, { useState, useEffect  } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { HashLink } from 'react-router-hash-link';

const Header = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setScrolling(true); // إذا تم التمرير أكثر من 50px
      } else {
        setScrolling(false); // إذا كان في أعلى الصفحة
      }
    };

    // إضافة مستمع للتمرير
    window.addEventListener("scroll", handleScroll);

    // تنظيف المستمع عند إلغاء تحميل العنصر
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Navbar expand="lg" className={`headerTop ${scrolling ? "scrolled" : ""}`}>
        <Container>
            <Navbar.Brand href="#home" className='logo'>myPortfolio</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="links ms-auto">
                      <HashLink smooth to="/">Home</HashLink>

                      <HashLink smooth to="/#About">About</HashLink>    

                      <HashLink smooth to="/#Services">Services</HashLink>    

                      <HashLink smooth to="/#Skills">Skills</HashLink>    

                      <HashLink smooth to="/#Certificates">Certifilcal</HashLink>    

                      <HashLink smooth to="/#projects">projects</HashLink>    

                      <HashLink smooth to="/#Contact">contact me</HashLink>    

                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header
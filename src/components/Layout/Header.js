import React, { useState, useEffect  } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

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
                <Nav className="ms-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#About">About</Nav.Link>
                    <Nav.Link href="#Services">Services</Nav.Link>
                    <Nav.Link href="#Skills">Skills</Nav.Link>
                    <Nav.Link href="#Certificates">my certifilcal</Nav.Link>
                    <Nav.Link href="#Projects">my projects</Nav.Link>
                    <Nav.Link href="#Contact">contact me</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header
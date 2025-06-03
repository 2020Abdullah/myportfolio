import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase';
import { Card, Col, Container, Row } from 'react-bootstrap';


const Skills = () => {
  const [myskills, setMySkills] = useState([]);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchSkills = async () => {
    const querySnapshot = await getDocs(collection(db, "skills"));
    const skillsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setMySkills(skillsData);
  }

  const animationSection = () => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // يبدأ عندما يظهر 30% من القسم
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }

  useEffect(() => {
    animationSection();
    fetchSkills();
  }, [])

  return (
    <section id='Skills'>
    <Container>
        <h2 className='section-title'>myskills</h2>
        <Row>
          {myskills.map((skill, index) => (
              <Col lg={3} className='mb-2' key={index}>
                <Card style={{ animationDelay: `${index * 0.2}s` }} className={`skill-box animate__animated ${isVisible ? "animate__fadeInUp" : ""}`}>
                  <Card.Body>
                    <h3>{skill.name}</h3>
                  </Card.Body>
                </Card>
              </Col>
          ))}
      </Row>
    </Container>
  </section>
  )
}


export default Skills
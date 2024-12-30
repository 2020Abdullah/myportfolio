import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { Card, Col, Container, Row } from 'react-bootstrap';


const Skills = () => {
  const [myskills, setMySkills] = useState([]);

  const fetchSkills = async () => {
    const querySnapshot = await getDocs(collection(db, "skills"));
    const skillsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setMySkills(skillsData);
  }

  useEffect(() => {
    fetchSkills();
  }, [])

  return (
    <section id='Skills'>
    <Container>
        <h2 className='section-title'>myskills</h2>
        <Row>
          {myskills.map((skill, index) => (
              <Col lg={3} className='mb-2' key={index}>
                <Card>
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
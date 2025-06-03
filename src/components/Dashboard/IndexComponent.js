import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const IndexComponent = () => {

  return (
    <section className='dashboard_content'>
        <Row>
            <Col lg={4} md={4} sm={12}>
              <Card>
                  <Card.Body>
                      <NavLink className="page_link" to="project/view">
                        <img src='./images/clipboard.png' alt='projects' style={{ maxWidth: "100px", height: "auto" }}/>
                        <h3>المشاريع</h3>
                      </NavLink>
                  </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={4} sm={12}>
              <Card>
                  <Card.Body>
                      <NavLink className="page_link" to="skills/view">
                        <img src='./images/abilities.png' alt='abilities' style={{ maxWidth: "100px", height: "auto" }}/>
                        <h3>المهارات</h3>
                      </NavLink>
                  </Card.Body>
              </Card>
            </Col>


            <Col lg={4} md={4} sm={12}>
              <Card>
                  <Card.Body>
                      <NavLink className="page_link" to="servies/view">
                        <img src='./images/customer-service.png' alt='service' style={{ maxWidth: "100px", height: "auto" }}/>
                        خدماتي 
                      </NavLink>
                  </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={4} sm={12}>
              <Card>
                  <Card.Body>
                      <NavLink className="page_link" to="certfical/view">
                        <img src='./images/certficate.png' alt='certficate' style={{ maxWidth: "100px", height: "auto" }}/>
                        شهاداتي 
                      </NavLink>
                  </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={4} sm={12}>
              <Card>
                  <Card.Body>
                      <NavLink className="page_link" to="About/view">
                        <img src='./images/profile.png' alt='profile' style={{ maxWidth: "100px", height: "auto" }}/>
                        معلومات عني 
                      </NavLink>
                  </Card.Body>
              </Card>
            </Col>

        </Row>
    </section>
  )
}

export default IndexComponent
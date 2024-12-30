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
                        المشاريع
                      </NavLink>
                  </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={4} sm={12}>
              <Card>
                  <Card.Body>
                      <NavLink className="page_link" to="skills/view">
                        المهارات
                      </NavLink>
                  </Card.Body>
              </Card>
            </Col>


            <Col lg={4} md={4} sm={12}>
              <Card>
                  <Card.Body>
                      <NavLink className="page_link" to="servies/view">
                        خدماتي 
                      </NavLink>
                  </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={4} sm={12}>
              <Card>
                  <Card.Body>
                      <NavLink className="page_link" to="certfical/view">
                        شهاداتي 
                      </NavLink>
                  </Card.Body>
              </Card>
            </Col>

        </Row>
    </section>
  )
}

export default IndexComponent
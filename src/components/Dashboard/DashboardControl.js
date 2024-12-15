import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import IndexProject from './myprojects/IndexProject';
import IndexComponent from './IndexComponent';
import { Button, Container } from 'react-bootstrap';
import CreateProject from './myprojects/CreateProject';
import EditProject from './myprojects/EditProject';

const DashboardControl = () => {

  return (
    <section className="dashboard">
        <Container>
            <div className='page_header'>
                <h3>لوحة التحكم</h3>
                <NavLink to="/control/" className="text-white">
                  <Button variant='primary'>
                    <i className='fa fa-home'></i>
                  </Button>
                </NavLink>
            </div>
            <Routes>
                <Route path="/" element={<IndexComponent />} />
                <Route path="/project/view" element={<IndexProject />} />
                <Route path="/project/add" element={<CreateProject />}></Route>
                <Route path="/project/edit" element={<EditProject />}></Route>
            </Routes>
        </Container>
    </section>
  )
}

export default DashboardControl
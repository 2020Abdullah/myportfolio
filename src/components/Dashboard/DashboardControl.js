import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import IndexProject from './myprojects/IndexProject';
import IndexComponent from './IndexComponent';
import { Button, Container } from 'react-bootstrap';
import CreateProject from './myprojects/CreateProject';
import EditProject from './myprojects/EditProject';
import IndexSkills from './myskills/IndexSkills';
import IndexServices from './myservices/IndexServices';
import CreateServices from './myservices/CreateServices';
import EditServices from './myservices/EditServices';
import IndexView from './myCertifical/IndexView';
import IndexAbout from './myAbout/IndexAbout';

const DashboardControl = () => {

  return (
    <section className="dashboard">
        <Container>
            <div className='page_header'>
                <h3>لوحة التحكم</h3>
                <div className="setting">
                  <NavLink to="/control/" className="text-white">
                    <Button variant='primary'>
                      <i className='fa fa-cog'></i>
                    </Button>
                  </NavLink>
                  <NavLink to="/" className="text-white me-2">
                    <Button variant='primary'>
                      <i className='fa fa-home'></i>
                    </Button>
                  </NavLink>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<IndexComponent />} />
                <Route path="/project/view" element={<IndexProject />} />
                <Route path="/project/add" element={<CreateProject />}></Route>
                <Route path="/project/edit" element={<EditProject />}></Route>

                <Route path="/skills/view" element={<IndexSkills />}></Route>

                <Route path="/servies/view" element={<IndexServices />} />
                <Route path="/servies/add" element={<CreateServices />}></Route>
                <Route path="/servies/edit" element={<EditServices />}></Route>

                <Route path="/certfical/view" element={<IndexView />}></Route>
                <Route path="/About/view" element={<IndexAbout />}></Route>

            </Routes>
        </Container>
    </section>
  )
}


export default DashboardControl
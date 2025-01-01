import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';

const Projects = () => {
    const [Allprojects, setProjects] = useState([]);

    useEffect(() => {
      fetchProjects();
    }, [Allprojects])

    const fetchProjects = async () => {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setProjects(projectsData);
    }

  return (
    <section id='projects' className="py-5 bg-light">
    <div className="container">
      <h2 className="section-title text-center mb-4">my best Projects</h2>

      {/* شبكة المشاريع */}
      <div className="row g-4">
        {Allprojects.map((project) => (
          <div key={project.id} className="col-md-4 col-sm-6">
            <div className="project_card">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="project_img"
                />
              
                <div className="project_content">
                  <h5 className="card-title">{project.name}</h5>
                  <p>{project.description}</p>
                  <a className='btn btn-danger' href={project.video}>
                    explore now
                  </a>
                </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}


export default Projects
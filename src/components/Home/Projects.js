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
      <h2 className="section-title text-center mb-4">my Projects</h2>

      {/* شبكة المشاريع */}
      <div className="row g-4">
        {Allprojects.map((project) => (
          <div key={project.id} className="col-md-4 col-sm-6">
            <div className="card shadow-sm h-100">
              <img
                src={project.imageUrl}
                alt={project.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{project.name}</h5>
                <p>{project.description}</p>
              </div>
              <div className='card-footer text-center justify-content-center'>
                <a className='btn btn-success me-2' href={project.previewLink}>
                  explore now
                </a>

                <a className='btn btn-danger' href={project.video}>
                  show video
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
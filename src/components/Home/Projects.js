import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase';

const Projects = () => {
    const [Allprojects, setProjects] = useState([]);
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    
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
        {Allprojects.map((project, index) => (
          <div key={project.id} className="col-md-4 col-sm-6">
            <div className='card-container'>
              <div style={{ animationDelay: `${index * 0.2}s` }} className={`card project_card animate__animated ${isVisible ? "animate__fadeInUp" : ""}`}>
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="project_img"
                  />
                
                  <div className="project_content">
                    <h5 className="card-title">{project.name}</h5>
                    <p>{project.description}</p>
                    <a className='btn btn-danger' href={project.video}>
                      اكتشف الآن
                    </a>
                  </div>

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
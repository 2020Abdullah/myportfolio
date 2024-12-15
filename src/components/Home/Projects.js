import React, { useState } from 'react'

const projectsData = [
    { id: 1, title: "مشروع تصميم ويب", category: "Learning System", image: "https://picsum.photos/300/200?random=1" },
    { id: 2, title: "تطبيق موبايل", category: "Mobile App", image: "https://picsum.photos/300/200?random=2" },
    { id: 3, title: "نظام إدارة قواعد البيانات", category: "Database", image: "https://picsum.photos/300/200?random=3" },
    { id: 4, title: "موقع ديناميكي", category: "Web Development", image: "https://picsum.photos/300/200?random=4" },
    { id: 5, title: "تطبيق React", category: "Web Development", image: "https://picsum.photos/300/200?random=5" },
    { id: 6, title: "تطوير واجهة المستخدم", category: "UI/UX", image: "https://picsum.photos/300/200?random=6" },
  ];

const categories = ["All", "Online stores", "Restaurants", "chat System", "LMS websites" , "blogs"];

const Projects = () => {
    const [filteredProjects, setFilteredProjects] = useState(projectsData);

    const filterProjects = (category) => {
        if (category === "All") {
        setFilteredProjects(projectsData);
        } else {
        const filtered = projectsData.filter((project) => project.category === category);
        setFilteredProjects(filtered);
        }
    };

  return (
    <section id='projects' className="py-5 bg-light">
    <div className="container">
      <h2 className="section-title text-center mb-4">my Projects</h2>

      {/* أزرار الفئات */}
      <div className="d-flex justify-content-center flex-wrap mb-4 gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className="btn btn-primary"
            onClick={() => filterProjects(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* شبكة المشاريع */}
      <div className="row g-4">
        {filteredProjects.map((project) => (
          <div key={project.id} className="col-md-4 col-sm-6">
            <div className="card shadow-sm h-100">
              <img
                src={project.image}
                alt={project.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text text-muted">{project.category}</p>
              </div>
              <div className='card-footer text-center'>
                <a className='btn btn-success' href='#'>
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
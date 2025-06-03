import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase';
import { Card } from 'react-bootstrap';

const Services = () => {
  const [services, setServices] = useState([]);
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
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const querySnapshot = await getDocs(collection(db, 'services'));
    const servicesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    setServices(servicesData);
  }


  return (
    <section id='Services' className="services-section">
    <h2 className='section-title'>my services</h2>
    <div className="row">
        {
            services.map((s, index) => {
                return (
                  <div className='col-md-4' key={s.id}>
                    <Card style={{ animationDelay: `${index * 0.2}s` }} className={`service animate__animated ${isVisible ? "animate__fadeInUp" : ""}`}>
                      <Card.Img src={s.imageUrl} alt={s.title} />
                      <Card.Body>
                        <h3>{s.title}</h3>
                        <p>{s.description}</p>
                      </Card.Body>
                    </Card>
                  </div>
                )
            })
        }
    </div>
    </section>
  )
}

export default Services
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { Card } from 'react-bootstrap';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
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
            services.map((s) => {
                return (
                  <div className='col-md-4' key={s.id}>
                    <Card className='service mb-3'>
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
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';

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
    <div className="services-container">
        {
            services.map((s) => {
                return (
                    <div className="service">
                        {s.imageUrl && <img src={s.imageUrl} alt={s.title} width={100} height={100}/>} 
                        <h3>{s.title}</h3>
                        <p>{s.description}</p>
                    </div>
                )
            })
        }
    </div>
    </section>
  )
}

export default Services
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Card } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';


const Certifical = () => {
  const [Cert, setCert] = useState([]);

  const fetchCert = async () => {
    const querySnapshot = await getDocs(collection(db, "myCert"));
    const CertData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    setCert(CertData);
  }

  useEffect(() => {
    fetchCert();
  }, []);

  return (
    <section id="Certificates">
        <div className="container">
            <h2 className="section-title text-center mb-4">My Certificates</h2>
            <Swiper
               modules={[Navigation, Pagination, Autoplay]}
               navigation
               pagination={{ clickable: true }}
               autoplay={{ delay: 3000 }}
               spaceBetween={20}
               slidesPerView={1}
               breakpoints={{
                 768: { slidesPerView: 2 },
                 1200: { slidesPerView: 3 },
               }}
            >
            {Cert.map((certificate) => (
                <SwiperSlide key={certificate.id}>
                    <Card>
                        <Card.Img variant="top" src={certificate.image} alt={certificate.title} />
                        <Card.Body>
                            <h3>{certificate.name}</h3>
                        </Card.Body>
                    </Card>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
    </section>
  )
}

export default Certifical
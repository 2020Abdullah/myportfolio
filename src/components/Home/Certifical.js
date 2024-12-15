import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Card } from 'react-bootstrap';

const myCertifical = [
    { id: 1, title: "HTML", issuer: "Issued by: Microsoft" , image: "./images/cert/cert1.png" },
    { id: 2, title: "CSS", issuer: "Issued by: Microsoft" , image: "./images/cert/cert2.png" },
    { id: 3, title: "JAVASCRIPT", issuer: "Issued by: Microsoft" , image: "./images/cert/cert3.png" },
    { id: 4, title: "Jquery AND Bootstrap", issuer: "Issued by: Microsoft" , image: "./images/cert/cert4.png" },
    { id: 5, title: "Gradution Project", issuer: "Issued by: Microsoft" , image: "./images/cert/cert5.png" },
];

const Certifical = () => {
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
            {myCertifical.map((certificate) => (
                <SwiperSlide key={certificate.id}>
                    <Card>
                        <Card.Img variant="top" src={certificate.image} alt={certificate.title} />
                        <Card.Body>
                            <h3>{certificate.title}</h3>
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
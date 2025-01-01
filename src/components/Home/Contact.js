import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Formspree URL
    const formspreeUrl = "https://formspree.io/f/xgepnawl"; // استبدل {form_id} بـ ID النموذج الخاص بك

    fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
    })
    .then((response) => {
      if (response.ok) {
        Swal.fire({
            icon: "success",
            title: "عملية ناجحة",
            text: "تم إرسال رسالتك  بنجاح"
        });

        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("حدث خطأ أثناء الإرسال.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("حدث خطأ أثناء الإرسال.");
    });
  }

  return (
    <section id="Contact">
    <Container>
      <div className="row text-center mb-5">
        <h2 className="section-title fw-bold">Contact Us</h2>
        <p className="text-muted">We'd love to hear from you! Please fill out the form below to get in touch.</p>
      </div>
      <div className="row">
        <div className="col-md-5 mb-4">
          <h3 className="fw-bold">Get in Touch</h3>
          <p className="text-muted">Feel free to reach out to us with any questions, feedback, or inquiries. We're here to help!</p>
          <ul className="list-unstyled">
            <li className="mb-3">
              <i className="bi bi-geo-alt-fill text-primary me-2"></i>
              <span>Cairo, Egypt</span>
            </li>
            <li className="mb-3">
              <i className="bi bi-envelope-fill text-primary me-2"></i>
              <span>abdallamohmad999@gmail.com</span>
            </li>
            <li className="mb-3">
              <i className="bi bi-telephone-fill text-primary me-2"></i>
              <span>01095314681 / 01557324199</span>
            </li>
          </ul>
          <div className="social-icons mt-4">
            <a href="https://www.facebook.com/FRABDALLA/" className="text-success me-3 fs-4"><i className="fab fa-facebook"></i></a>
            <a href="https://github.com/2020Abdullah" className="text-success me-3 fs-4"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/abdalla2024/" className="text-success me-3 fs-4"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div className="col-md-7">
          <form onSubmit={sendEmail}>
            <div className="row g-3"> 
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input type="text" onChange={handleChange} className="form-control" name="name" placeholder="Enter your name" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input type="email" onChange={handleChange} className="form-control" name="email" placeholder="Enter your email" required />
              </div>
              <div className="col-12">
                <label className="form-label">Subject</label>
                <input type="text" onChange={handleChange} className="form-control" name="subject" placeholder="Enter your subject" required />
              </div>
              <div className="col-12">
                <label className="form-label">Your Message</label>
                <textarea name="message" onChange={handleChange} className="form-control" rows="5" placeholder="Write your message" required></textarea>
              </div>
            </div>
            <div className="text-end mt-4">
              <button type="submit" className="btn btn-primary px-4 py-2">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  </section>
  )
}

export default Contact
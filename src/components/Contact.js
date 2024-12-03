import React from 'react'
import { Container } from 'react-bootstrap'

const Contact = () => {
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
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label for="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
              </div>
              <div className="col-md-6">
                <label for="email" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
              </div>
              <div className="col-12">
                <label for="subject" className="form-label">Subject</label>
                <input type="text" className="form-control" id="subject" placeholder="Enter your subject" required />
              </div>
              <div className="col-12">
                <label for="message" className="form-label">Your Message</label>
                <textarea id="message" className="form-control" rows="5" placeholder="Write your message" required></textarea>
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
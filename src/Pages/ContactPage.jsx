import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import contactIllustration from "../assets/images/contact.jpg";
import "../Css/ContactPage.css"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.message.trim())
      newErrors.message = "Please enter your message.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("Message submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="hero-section text-white text-center py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">Contact us</h1>
          <p className="lead">
            We’re here to help and answer any questions you might have.
          </p>
        </div>
      </section>

      {/* Form & Illustration */}
      <section className="py-5 bg-white">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-center gap-5">
          <img
            src={contactIllustration}
            alt="Contact Illustration"
            className="img-fluid"
            style={{ maxWidth: "400px" }}
          />
          <form
            onSubmit={handleSubmit}
            className="shadow p-4 bg-white rounded"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h5 className="mb-3">Send us a message</h5>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name && "is-invalid"}`}
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <textarea
                name="message"
                className={`form-control ${errors.message && "is-invalid"}`}
                rows="4"
                placeholder="How we can help"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <div className="invalid-feedback">{errors.message}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              SUBMIT MESSAGE HERE
            </button>
          </form>
        </div>
      </section>

      {/* Contact Info Section */}
      {/* <section className="bg-light py-5">
        <div className="container text-center">
          <h4 className="mb-4">Get in touch with us</h4>
          <div className="row g-4 justify-content-center">
            <div className="col-md-3">
              <FaPhoneAlt className="text-primary mb-2" size={20} />
              <p className="mb-1">
                <a href="tel:+919514555132" className="text-decoration-none text-dark">
                  +91 95145 55132
                </a>
              </p>
             
            </div>
            <div className="col-md-3">
              <FaEnvelope className="text-danger mb-2" size={20} />
              <p className="mb-1">
                <a
                  href="mailto:drshivakumaarj.md@signpostphonebook.in"
                  className="text-decoration-none text-dark"
                >
                  drshivakumaarj.md@signpostphonebook.in
                </a>
              </p>
              <p>
                <a
                  href="mailto:support@signpost.in"
                  className="text-decoration-none text-dark"
                >
                  support@signpost.in
                </a>
              </p>
               
            </div>
            <div className="col-md-3">
              <FaFacebookF className="text-info mb-2 me-2" size={18} />
              <FaTwitter className="text-info mb-2" size={18} />
              <p className="mt-2">Follow us on social media</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="cta-section text-white py-5 text-center">
        <div className="container">
          <h4 className="mb-3">Ready to get started?</h4>
          <p className="mb-4">
            Try our services free for 5 days and decide if we’re the right fit
            for your business.
          </p>
          <a
            href="https://maps.app.goo.gl/p8LGyq3KxWWfadFH6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn btn-light text-primary px-4">
              View on Google Maps
            </button>
          </a>
        </div>
      </section>
 
    </div>
  );
};

export default ContactPage;



 
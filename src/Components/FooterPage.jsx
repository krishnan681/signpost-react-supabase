import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";
import "../Css/FooterPage.css";

import phonebooklogo from "../assets/Images/Logo/Login Page Logo.jpg";

const FooterPage = () => {
  return (
    <footer className="whole-fotter text-light pt-5 pb-3 mt-5 border-top">
      <Container>
        <Row className="gx-5 gy-4">
          {/* Left Column: Logo and Description */}
          <Col xs={12} sm={12} md={5} lg={5}>
            <h5 className="fw-bold">Phonebook</h5>
            <img src={phonebooklogo} alt="Logo" className="my-3" />
            <p className="fw-bold">
              Signpost PHONE BOOK is your ultimate solution for effective
              business promotion. We specialize in helping businesses reach
              their target audience through powerful marketing channels like
              SMS, WhatsApp, and Email.
            </p>
            <p>Connect with us</p>
            <div className="d-flex gap-2 flex-wrap">
              <a href="#" className="social-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </Col>

          {/* Middle Column: Corporate Links */}
          <Col xs={6} sm={6} md={3} lg={3}>
            <h6 className="fw-bold">Links</h6>
            <ul className="Footer-Links list-unstyled">
              <li><a href="/AboutPage">About us</a></li>
              <li><a href="/ContactPage">Contact us</a></li>
              <li><a href="/ads">Ads</a></li>
              <li><a href="/PostYourListing">Advertise on Listing</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/copyright">Copyright Policy</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </Col>

          {/* Right Column: Careers + Contact Us */}
          <Col xs={6} sm={6} md={4} lg={4}>
            <Row>
              <Col xs={12} sm={6}>
                <h6 className="fw-bold">Careers</h6>
                <ul className="Footer-Links list-unstyled">
                  <li><a href="https://signpost4jobs.in/">signpost4jobs</a></li>
                </ul>
              </Col>
              <Col xs={12} sm={6}>
                <div>
                  <h6 className="fw-bold">Contact Us</h6>
                  <p>For inquiries, please reach out to us at:</p>
                  <p>Email:</p>
                  {/* <p className="ContactFooter-Links">
                    <a href="mailto:support@signpostphonebook.com">
                      support@signpostphonebook.com
                    </a>
                  </p> */}
                  <p>Phone:</p>
                  <p className="ContactFooter-Links">
                    <a href="tel:+919514555132">95145 55132</a>
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <p className="text-center text-muted mb-0">
          © 2025 phonebook.com All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default FooterPage;

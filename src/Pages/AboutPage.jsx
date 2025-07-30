import React from 'react';
import '../Css/AboutPage.css'
import Timeline from "../Components/Timeline";

const AboutPage = () => {
  return (
    <div className="about-page container py-5">
      <div className="about-header text-center mb-5">
        <h1>About Signpost PHONE BOOK</h1>
        <p className="lead">
          Signpost PHONE BOOK is Your ultimate solution for effective business promotion. We specialize in helping businesses reach their target audience through powerful marketing channels like SMS, WhatsApp, and Email.
        </p>
      </div>

      <div className="about-content row g-4">
        {/* Left Column */}
        <div className="col-lg-6">
          <h4>Highlights</h4>
          <ul className="list-unstyled">
            <li>✅ Built-in Database of Lakhs of MSMEs</li>
            <li>✅ Mobile-friendly (Works on Smart & Feature Phones)</li>
            <li>✅ Firm-wise Alphabetical & Category-wise Search (10,000+ Categories)</li>
            <li>✅ Daily Updates with New MSME Firms</li>
            <li>✅ Highly Useful for B2C & B2B Segments</li>
            <li>✅ Promote via SMS, WhatsApp, Email</li>
            <li>✅ Special Reach: Category-wise or Location-based</li>
          </ul>

          <h4 className="mt-4">Uses</h4>
          <ul className="list-unstyled">
            <li>📞 Find & Dial MSME Contacts</li>
            <li>📲 Send SMS / WhatsApp / Emails</li>
            <li>📋 Shortlist Targeted Prospects</li>
            <li>📍 Nearby Bulk Marketing (By Pincode/Area)</li>
            <li>✉️ Send Clearance Offers, New Intros, Invites, Reminders</li>
            <li>👨‍💼 Reach Specific Audiences (Professionals, Gents, Ladies)</li>
          </ul>
        </div>

           <Timeline />


        {/* Right Column */}
        <div className="col-lg-6">
          <div className="info-box p-4 shadow-sm rounded bg-light">
            <h5>Subscription Plans (For MSMEs Only)</h5>
            <ul>
              <li>💼 ₹2,500 for Tiny & Micro Enterprises</li>
              <li>🏢 ₹4,500 for Small Enterprises</li>
            </ul>

            <div className="mt-4">
              <h6>For Registrations, Subscription:</h6>
              <address>
                46, SIGNPOST TOWERS, FIRST FLOOR,<br />
                SIDCO INDUSTRIAL ESTATE,<br />
                COIMBATORE, Tamil Nadu – 641021<br />
                📞 Contact: <a href="tel:9514555132">95145 55132</a>
              </address>
              <a href="https://www.signpostphonebook.in" target="_blank" rel="noreferrer">
                🌐 www.signpostphonebook.in
              </a>
              <div className="mt-3">
                <strong>Scan QR Code:</strong><br />
                <img
                  src="/images/qrscan.png"
                  alt="QR Code"
                  className="qr-img mt-2"
                />
              </div>
            </div>
          </div>

          <div className="support-note mt-4">
            <p>
              Our platform ensures seamless experience to create, manage, and
              track promotional campaigns. Whether you're a small business or a large enterprise, we offer tools to scale with your needs.
            </p>
            <p>
              💡 Enjoy 24/7 customer support and focus on growing your business while we handle your communication.
            </p>
            <strong>Start your journey with Signpost PHONE BOOK today!</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;


   {/* Featured Stats Section */}

      {/* <div className="featured-stats-section text-dark position-relative py-5">
        <div className="overlay-bg"></div>
        <div className="container featured-Section ">
          <Row className="align-items-center gy-4">
           
            <Col lg={6} md={12}>
              <h2 className="fw-bold mb-3">
                Discover Our More than 15,000 Listings,
              </h2>
              <p className="mb-4 text-dark">
                We connect you to the best suppliers in the industry. Our
                directory makes discovering, comparing, and connecting seamless.
              </p>

              <ul className="list-unstyled mb-4">
                <li className="mb-2">
                  <span className="check-icon me-2">✔</span> Stay connected
                </li>
                <li className="mb-2">
                  <span className="check-icon me-2">✔</span> Modern Listings
                </li>
                <li className="mb-2">
                  <span className="check-icon me-2">✔</span> Verified Businesses
                </li>
                <li className="mb-2">
                  <span className="check-icon me-2">✔</span> Well Organized
                  Theme
                </li>
              </ul>

              <Row>
                <Col xs={6}>
                  <h2 className="text-warning fw-bold">6k</h2>
                  <p className="text-dark">Our Happy Clients</p>
                </Col>
                <Col xs={6}>
                  <h2 className="text-warning fw-bold">10k</h2>
                  <p className="text-dark">Total Verified Listings</p>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <h2 className="text-warning fw-bold">6k</h2>
                  <p className="text-dark">Our Happy Clients</p>
                </Col>
                <Col xs={6}>
                  <h2 className="text-warning fw-bold">10k</h2>
                  <p className="text-dark">Total Verified Listings</p>
                </Col>
              </Row>
            </Col>

            <Col lg={6} md={12} className="position-relative text-center">
              <div className="d-inline-block position-relative img-half-container">
                <CircularText
                  text="100%*Secured*Trust Worthy*"
                  onHover="speedUp"
                  spinDuration={20}
                  className="rotated-circle"
                />
                <img
                  src={MobileOne}
                  className="floating-img img-fluid"
                  alt="main"
                />
              </div>
            </Col>
          </Row>
        </div>
      </div> */}
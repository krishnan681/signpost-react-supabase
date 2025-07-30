// // src/Components/EnquiryModal.jsx
// import React, { useState } from "react";
// import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// import "../Css/RecentlyListEnquiryModal.css"

// const RecentlyListEnquiryModal = ({ show, onHide, user }) => {
//   const [name, setName] = useState(user?.name || "");
//   const [mobile, setMobile] = useState(user?.mobile || "");
//   const [serviceType, setServiceType] = useState("Electrical installation");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Send to Supabase or API here
//     console.log({ name, mobile, serviceType });

//     // Close modal after success
//     onHide();
//   };

//   return (
//     <Modal show={show} onHide={onHide} size="lg" centered className="enquiry-modal">
//       <Modal.Body>
//         <Row>
//           {/* Left Form Side */}
//           <Col md={7} className="px-4 py-3">
//             <h4 className="fw-bold">
//               Get the List of Top <span className="text-primary">Electrical Contractors</span>
//             </h4>

//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Name*</Form.Label>
//                 <Form.Control
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Mobile Number*</Form.Label>
//                 <Form.Control
//                   type="text"
//                   required
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Label>What are you seeking?</Form.Label>
//               <div className="d-flex gap-3 mb-3">
//                 <Form.Check
//                   type="radio"
//                   label="Electrical installation"
//                   name="serviceType"
//                   checked={serviceType === "Electrical installation"}
//                   onChange={() => setServiceType("Electrical installation")}
//                 />
//                 <Form.Check
//                   type="radio"
//                   label="Electrical maintenance and repair"
//                   name="serviceType"
//                   checked={serviceType === "Electrical maintenance and repair"}
//                   onChange={() => setServiceType("Electrical maintenance and repair")}
//                 />
//               </div>

//               <Button type="submit" className="w-100 btn btn-primary">
//                 SEND ENQUIRY
//               </Button>
//             </Form>

//             <ul className="mt-4 small text-muted">
//               <li>Your requirement is sent to selected relevant businesses</li>
//               <li>Businesses compete to get you the best deal</li>
//               <li>You choose whichever suits you best</li>
//               <li>Contact info sent to you via SMS/Email</li>
//             </ul>
//           </Col>

//           {/* Right Image Side */}
//           <Col md={5} className="bg-light d-flex align-items-center justify-content-center">
//             <div className="text-center px-3">
//               <img
//                 src="https://via.placeholder.com/150x150.png?text=Promo+Image"
//                 alt="promo"
//                 className="img-fluid mb-3"
//               />
//               <p className="fw-bold mb-1">Connect with</p>
//               <h5 className="text-primary fw-bold mb-2">19.1 Crore+ Buyers</h5>
//               <p className="small text-muted">on Signpost</p>
//               <Button variant="primary" className="rounded-pill">
//                 List your business for <b>FREE</b>
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default RecentlyListEnquiryModal;

// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import "../Css/RecentlyListEnquiryModal.css";

// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const MySwal = withReactContent(Swal);

// const RecentlyListEnquiryModal = ({ show, onClose }) => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const validate = () => {
//     const { name, phone, email, message } = formData;
//     const phoneRegex = /^[6-9]\d{9}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!name || !phone || !email || !message) {
//       return "All fields are required.";
//     }
//     if (!phoneRegex.test(phone)) {
//       return "Phone number must start with 6-9 and be 10 digits.";
//     }
//     if (!emailRegex.test(email)) {
//       return "Invalid email format.";
//     }
//     return null;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const error = validate();
//     if (error) {
//       Swal.fire("Validation Error", error, "warning");
//       return;
//     }

//     if (!user) {
//       Swal.fire({
//         icon: "info",
//         title: "You're not logged in",
//         text: "Please login or signup to send an enquiry.",
//         showCancelButton: true,
//         confirmButtonText: "Login / Signup",
//         cancelButtonText: "Cancel",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/login");
//         }
//       });
//       return;
//     }

//     if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
//       Swal.fire("Note", "SMS feature works only on mobile devices.", "info");
//       return;
//     }

//     const businessNumber = "9876543210"; // your actual business number
//     const smsText = encodeURIComponent(
//       `Hello, I’m ${formData.name}.\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`
//     );

//     window.location.href = `sms:${businessNumber}?body=${smsText}`;

//     onClose();
//     setFormData({ name: "", phone: "", email: "", message: "" });
//   };

//   if (!show) return null;

//   return (
//     <div className="enquire-modal-backdrop">
//       <div className="enquire-modal-container animate__animated animate__fadeInDown">
//         <div className="close-button" onClick={onClose}>
//           ×
//         </div>
//         <div className="row g-0 modal-inner">
//           {/* Left Column - Promo */}
//           <div className="col-md-5 left-side d-flex align-items-center justify-content-center">
//             <div className="text-center px-3">
//               <img
//                 src="https://via.placeholder.com/150x150.png?text=Promo+Image"
//                 alt="Promo"
//                 className="img-fluid mb-3"
//               />
//               <p className="fw-bold mb-1">Connect with</p>
//               <h5 className="text-primary fw-bold mb-2">20k People</h5>
//               <p className="small text-muted">on Signpost</p>
//               <button
//                 className="btn btn-primary rounded-pill"
//                 onClick={() => navigate("/PostYourListing")}
//               >
//                 List your business for <b>FREE</b>
//               </button>
//             </div>
//           </div>

//           {/* Right Column - Form */}
//           <div className="col-md-7 p-4">
//             <h5 className="mb-3">Send Enquiry</h5>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control mb-2"
//                 placeholder="Your Name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 className="form-control mb-2"
//                 placeholder="Phone Number"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control mb-2"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               <textarea
//                 name="message"
//                 className="form-control mb-3"
//                 placeholder="Your Message"
//                 rows={3}
//                 value={formData.message}
//                 onChange={handleChange}
//               ></textarea>

//               <div className="d-flex justify-content-between">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={onClose}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   📩 Send SMS
//                 </button>
//               </div>

//               <div className="d-flex justify-content-between mt-3">
//                 <a
//                   href={`https://wa.me/9876543210?text=${encodeURIComponent(
//                     `Hi, I’m ${formData.name}. My phone is ${formData.phone}. I’d like to enquire about: ${formData.message}`
//                   )}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="btn btn-success"
//                 >
//                   💬 WhatsApp
//                 </a>

//                 <a
//                   href="tel:9876543210"
//                   className="btn btn-dark"
//                 >
//                   📞 Call
//                 </a>
//               </div>
//             </form>

//             <ul className="mt-4 small text-muted ps-3">
//               <li>Your requirement is sent to selected relevant businesses</li>
//               <li>Businesses compete to get you the best deal</li>
//               <li>You choose whichever suits you best</li>
//               <li>Contact info sent to you via SMS/Email</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecentlyListEnquiryModal;


import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../Css/RecentlyListEnquiryModal.css";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

const MySwal = withReactContent(Swal);

const RecentlyListEnquiryModal = ({ show, onClose, selectedBusiness }) => {
  const { userData } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.person_name || userData.business_name || "",
        phone: userData.mobile_number || "",
      }));
    }
  }, [userData]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const { name, phone, message } = formData;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!name || !phone || !message) return "All fields are required.";
    if (!phoneRegex.test(phone))
      return "Phone number must start with 6-9 and be 10 digits.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validate();
    if (errorMsg) {
      Swal.fire("Validation Error", errorMsg, "warning");
      return;
    }

    if (!userData) {
      Swal.fire({
        icon: "info",
        title: "You're not logged in",
        text: "Please login or signup to send an enquiry.",
        showCancelButton: true,
        confirmButtonText: "Login / Signup",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    if (!selectedBusiness) {
      Swal.fire("Error", "No receiver data available.", "error");
      return;
    }

    const receiverName =
      selectedBusiness.business_name ||
      selectedBusiness.person_name ||
      "Business";
    const receiverMobile = selectedBusiness.mobile_number;

    try {
      const { error } = await supabase.from("enquiries").insert([
        {
          sender_id: userData.id,
          sender_name: userData.person_name || userData.business_name,
          sender_mobile: userData.mobile_number,
          receiver_id: selectedBusiness.id,
          receiver_name:
            selectedBusiness.person_name || selectedBusiness.business_name,
          receiver_mobile: receiverMobile,
          message: formData.message,
        },
      ]);

      if (error) {
        console.error(error);
        Swal.fire("Error", "Failed to save enquiry. Please try again.", "error");
        return;
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "An unexpected error occurred.", "error");
      return;
    }

    // SMS message (only on mobile)
    const smsBody = `Hello, I'm ${formData.name}.\nMessage: ${formData.message}`;
    const encodedSMS = encodeURIComponent(smsBody);

    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = `sms:${receiverMobile}?body=${encodedSMS}`;
    } else {
      Swal.fire("Note", "SMS sending is only available on mobile devices.", "info");
    }

    // WhatsApp message
    const whatsappText = encodeURIComponent(
      `Hi ${receiverName}, I’m ${formData.name}. Message: ${formData.message}`
    );
    window.open(`https://wa.me/${receiverMobile}?text=${whatsappText}`, "_blank");

    // Reset & close
    onClose();
    setFormData({
      name: userData.person_name || userData.business_name || "",
      phone: userData.mobile_number || "",
      message: "",
    });
  };

  if (!show) return null;

  return (
    <div className="enquire-modal-backdrop">
      <div className="enquire-modal-container animate__animated animate__fadeInDown">
        <div className="close-button" onClick={onClose}>
          ×
        </div>
        <div className="row g-0 modal-inner">
          <div className="col-md-5 left-side d-flex align-items-center justify-content-center">
            <div className="text-center px-3">
              <img
                src="https://via.placeholder.com/150x150.png?text=Promo+Image"
                alt="image"
                className="img-fluid mb-3"
              />
              <p className="fw-bold mb-1">Connect with</p>
              <h5 className="text-primary fw-bold mb-2">20k People</h5>
              <p className="small text-muted">on Signpost</p>
              <button
                className="btn btn-primary rounded-pill"
                onClick={() => navigate("/PostYourListing")}
              >
                List your business for <b>FREE</b>
              </button>
            </div>
          </div>

          <div className="col-md-7 p-4">
            <h5 className="mb-3">Send Enquiry</h5>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                className="form-control mb-2"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                disabled={!!userData}
              />
              <input
                type="text"
                name="phone"
                className="form-control mb-2"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                disabled={!!userData}
              />
              <textarea
                name="message"
                className="form-control mb-3"
                placeholder="Your Message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  📩 Send
                </button>
              </div>
            </form>

            <ul className="mt-4 small text-muted ps-3">
              <li>Your requirement is sent to selected relevant businesses</li>
              <li>Businesses compete to get you the best deal</li>
              <li>You choose whichever suits you best</li>
              <li>Contact info sent to you via SMS/WhatsApp</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyListEnquiryModal;

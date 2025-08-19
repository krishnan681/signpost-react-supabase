// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { supabase } from "../services/supabaseClient";
// import { Accordion } from "react-bootstrap";
// import "../Css/DirectoryIdDetails.css";

// // images

// import Product1 from "../assets/Images/Product1.png";
// import Product2 from "../assets/Images/Product2.png";
// import Product3 from "../assets/Images/Product3.png";
// import Product4 from "../assets/Images/Product4.png";
// import { h2 } from "framer-motion/client";

// const DirectoryIdDetails = () => {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [activeTab, setActiveTab] = useState("about");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("user_id", id)
//         .single();

//       if (data) setProfile(data);
//       else console.error("Error fetching profile:", error);
//     };

//     fetchProfile();
//   }, [id]);

//   if (!profile) return <div className="p-4">Loading profile...</div>;

//   // ✅ Dummy product data for testing
//   const products = [
//     {
//       name: "LED Bulb",
//       description:
//         "Energy-efficient bulb with long lifespan and low power consumption. Ideal for homes and offices.",
//       image: Product1,
//     },
//     {
//       name: "Solar Panel",
//       description:
//         "High-efficiency solar panel perfect for renewable energy setups in residential and industrial use.",
//       image: Product2,
//     },
//     {
//       name: "Electric Drill",
//       description:
//         "Compact and powerful drill for woodworking, metal, and home repairs.",
//       image: Product3,
//     },
//     {
//       name: "Welding Machine",
//       description:
//         "Reliable arc welding machine suitable for heavy-duty operations.",
//       image: Product4,
//     },
//     {
//       name: "Hydraulic Pump",
//       description:
//         "Durable and high-pressure hydraulic pump used in automation and industrial machinery.",
//       image: Product1,
//     },
//   ];

//   const productBackgroundColors = [
//     "#f8f9fa",
//     "#e3f2fd",
//     "#e8f5e9",
//     "#fff3e0",
//     "#fce4ec",
//   ];

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         {/* Main Left Content */}
//         <div className="col-lg-9">
//           {/* Profile Header */}
//           <div className="d-flex flex-wrap align-items-start mb-3 gap-3">
//             <img
//               src={profile.profile_image || "https://via.placeholder.com/100"}
//               alt="Profile"
//               className="rounded-circle"
//               style={{ width: "100px", height: "100px", objectFit: "cover" }}
//               onError={(e) =>
//                 (e.target.src = "https://via.placeholder.com/100")
//               }
//             />
//             <div className="flex-grow-1">
//               <div className="d-flex flex-column flex-md-row gap-2 mb-2">
//                 <span>
//                   <strong>Name:</strong>{" "}
//                   {profile.business_name ||
//                     `${profile.prefix} ${profile.person_name}`}
//                 </span>
//                 <span>
//                   <strong>City:</strong> {profile.city}
//                 </span>
//                 <span>
//                   <strong>GST:</strong> {profile.gst || "N/A"}
//                 </span>
//               </div>
//               <p>
//                 <strong>Description:</strong> {profile.description}
//               </p>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="mb-3">
//             <div className="d-flex gap-2 mb-2">
//               <button
//                 className={`btn btn-outline-primary ${
//                   activeTab === "about" ? "active" : ""
//                 }`}
//                 onClick={() => setActiveTab("about")}
//               >
//                 About
//               </button>
//               <button
//                 className={`btn btn-outline-primary ${
//                   activeTab === "products" ? "active" : ""
//                 }`}
//                 onClick={() => setActiveTab("products")}
//               >
//                 Products
//               </button>
//               <button
//                 className={`btn btn-outline-primary ${
//                   activeTab === "contact" ? "active" : ""
//                 }`}
//                 onClick={() => setActiveTab("contact")}
//               >
//                 Contact
//               </button>
//             </div>
//             <hr />
//           </div>

//           {/* About Tab */}
//           {activeTab === "about" && (
//             <div>
//               <h5>About</h5>
//               <p>{profile.description}</p>
//             </div>
//           )}

//           {/* Products Tab */}
//           {activeTab === "products" && (
//             <div className="container">
//               <h5>Products</h5>
//               <Accordion defaultActiveKey="0">
//                 {products.map((product, idx) => {
//                   const isEven = idx % 2 === 0;
//                   const bgColor =
//                     productBackgroundColors[
//                       idx % productBackgroundColors.length
//                     ];

//                   return (
//                     <Accordion.Item
//                       eventKey={idx.toString()}
//                       key={idx}
//                       className="border-0 mb-4"
//                     >
//                       <div
//                         className={`container d-flex position-relative align-items-center w-100 ${
//                           isEven ? "flex-row" : "flex-row-reverse"
//                         }`}
//                         style={{
//                           backgroundColor: bgColor,
//                           borderRadius: "10px",
//                           padding: "2rem 1rem 1rem",
//                           paddingLeft: isEven ? "6rem" : "1rem",
//                           paddingRight: !isEven ? "6rem" : "1rem",
//                           position: "relative",
//                         }}
//                       >
//                         {/* Overlapping Image */}
//                         <div
//                           style={{
//                             position: "absolute",
//                             top: "50%",
//                             transform: "translateY(-50%)",
//                             left: isEven ? "-30px" : "auto",
//                             right: !isEven ? "-30px" : "auto",
//                             width: "120px",
//                             height: "120px",
//                             zIndex: 2,
//                           }}
//                         >
//                           <img
//                             src={product.image}
//                             alt={product.name}
//                             style={{
//                               width: "100%",
//                               height: "100%",
//                               objectFit: "contain",
//                             }}
//                           />
//                         </div>

//                         {/* Text Content */}
//                         <div
//                           className="flex-grow-1"
//                           style={{
//                             fontFamily: "monospace",
//                             fontSize: "1rem",
//                             zIndex: 1,
//                           }}
//                         >
//                           <h5 className="fw-bold m-0">{product.name}</h5>
//                           <p className="m-0">{product.description}</p>
//                         </div>
//                       </div>

//                       {/* <Accordion.Body
//                         style={{
//                           fontFamily: "monospace",
//                           backgroundColor: bgColor,
//                           borderBottomLeftRadius: "10px",
//                           borderBottomRightRadius: "10px",
//                           paddingTop: "0.5rem",
//                         }}
//                       >
//                         {product.description.slice(80)}
//                       </Accordion.Body> */}
//                     </Accordion.Item>
//                   );
//                 })}
//               </Accordion>
//             </div>
//           )}

//           {/* Contact Tab */}
//           {activeTab === "contact" && (
//             <div>
//               <h5>Contact</h5>
//               <p>
//                 <strong>Phone:</strong> {profile.mobile_number}
//               </p>
//               <p>
//                 <strong>Email:</strong> {profile.email}
//               </p>
//               <p>
//                 <strong>Address:</strong> {profile.door_no},{" "}
//                 {profile.street_name}, {profile.area}, {profile.city},{" "}
//                 {profile.pincode}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Right Enquiry Form */}
//         <div className="col-lg-3 mt-4 mt-lg-0">
//           <div className="card p-3 shadow-sm">
//             <h5>Enquire {profile.business_name || profile.person_name} </h5>
//             <textarea
//               className="form-control mb-2"
//               rows="4"
//               placeholder="Type your enquiry..."
//             />
//             <input className="form-control mb-2" placeholder="Name" />
//             <input className="form-control mb-2" placeholder="Phone Number" />
//             <input className="form-control mb-3" placeholder="Email" />
//             <button className="btn btn-primary w-100">Send</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DirectoryIdDetails;

// DirectoryIdDetails.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { Accordion, Carousel } from "react-bootstrap";
import "../Css/DirectoryIdDetails.css";

// Dummy images
import Banner1 from "../assets/Images/Electrical.webp";
import Banner2 from "../assets/Images/Electrical.webp";
import Banner3 from "../assets/Images/Electrical.webp";
import Product1 from "../assets/Images/Product1.png";
import Product2 from "../assets/Images/Product2.png";
import Product3 from "../assets/Images/Product3.png";
import Product4 from "../assets/Images/Product4.png";
import { div } from "framer-motion/client";

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const DirectoryIdDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

useEffect(() => {
  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)  // fixed here
      .single();

    if (data) setProfile(data);
    else console.error("Error fetching profile:", error);
  };

  fetchProfile();
}, [id]);


  if (!profile) return <div className="p-4"></div>;

  // ✅ Dummy product data for testing
  const products = [
    {
      name: "LED Bulb",
      description:
        "Energy-efficient bulb with long lifespan and low power consumption. Ideal for homes and offices.",
      image: Product1,
    },
    {
      name: "Solar Panel",
      description:
        "High-efficiency solar panel perfect for renewable energy setups in residential and industrial use.",
      image: Product2,
    },
    {
      name: "Electric Drill",
      description:
        "Compact and powerful drill for woodworking, metal, and home repairs.",
      image: Product3,
    },
    {
      name: "Welding Machine",
      description:
        "Reliable arc welding machine suitable for heavy-duty operations.",
      image: Product4,
    },
    {
      name: "Hydraulic Pump",
      description:
        "Durable and high-pressure hydraulic pump used in automation and industrial machinery.",
      image: Product1,
    },
  ];

  const productBackgroundColors = [
    "#f8f9fa",
    "#e3f2fd",
    "#e8f5e9",
    "#fff3e0",
    "#fce4ec",
  ];

  const galleryImages = [Banner1, Banner2, Banner3];

  const handleCall = () => {
    window.location.href = `tel:${profile.mobile_number}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${profile.email}`;
  };

  const handleSMS = () => {
    window.location.href = `sms:${profile.mobile_number}`;
  };

  return (
    <div>
      {/* Banner Carousel   - this is for showing their logo or front image  */}
      {/* <Carousel
        className="mb-4 carousel-imagefordid"
        controls={false} // removes arrows
        indicators={true} // keeps dots
      >
        {galleryImages.map((img, idx) => (
          <Carousel.Item key={idx}>
            <img
              src={img}
              className="d-block w-100"
              alt={`Banner ${idx + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel> */}

      <div className="container mt-4">
        <div className="row">
       
          <div className="col-lg-9">
            <div className="d-flex flex-wrap gap-3 align-items-start mb-3">
              <img
                src={profile.profile_image || "https://via.placeholder.com/100"}
                alt="Profile"
                className="rounded-circle"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
              <div className="flex-grow-1">
                <div className="d-flex flex-column gap-2 mb-2 ">
                  <span>
                    <strong>Name:</strong>{" "}
                    {profile.business_name || `${profile.person_name}`}
                  </span>
                  <span>
                    <strong>City:</strong> {profile.city}
                  </span>
                  {/* <span>
                    <strong>GST:</strong> {profile.gst || "N/A"}
                  </span> */}
                </div>
                <p>
                  <strong>Description:</strong> {profile.description}
                </p>
              </div>
            </div>
            <div className="d-flex gap-2 mb-2">
              {["about", "contact"].map((tab) => (
                <button
                  key={tab}
                  className={`btn btn-outline-primary ${
                    activeTab === tab ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <hr />
            {activeTab === "about" && (
              <div>
                <h5>About</h5>
                <p>{profile.description}</p>
              </div>
            )}

            {/* {activeTab === "products" && (
              <div>
                <h5>Products</h5>
                <div className="d-flex flex-wrap gap-4">
                  {products.map((product, idx) => {
                    const bgColor =
                      productBackgroundColors[
                        idx % productBackgroundColors.length
                      ];
                    return (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: bgColor,
                          borderRadius: "10px",
                          padding: "1rem",
                          width: 220,
                          cursor: "pointer",
                          boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
                          textAlign: "center",
                          fontFamily: "monospace",
                        }}
                        onClick={() => {
                          setPhotoIndex(idx);
                          setLightboxOpen(true);
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: "100%",
                            height: 140,
                            objectFit: "contain",
                            marginBottom: "0.5rem",
                            borderRadius: "8px",
                          }}
                        />
                        <h6 className="fw-bold">{product.name}</h6>
                        <p style={{ fontSize: "0.9rem", minHeight: "3rem" }}>
                          {product.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                
                <Lightbox
                  open={lightboxOpen}
                  close={() => setLightboxOpen(false)}
                  slides={products.map((p) => ({
                    src: p.image,
                    title: p.name,
                    description: p.description,
                  }))}
                  index={photoIndex}
                  onIndexChange={setPhotoIndex}
                  plugins={[Thumbnails, Zoom]}
                  render={{
                    slideDescription: ({ slide }) => (
                      <div
                        style={{
                          color: "#eee",
                          backgroundColor: "rgba(0,0,0,0.4)",
                          padding: "0.75rem 1rem",
                          borderRadius: "8px",
                          textAlign: "center",
                          fontSize: "1rem",
                          maxWidth: "80vw",
                          margin: "0 auto",
                          lineHeight: "1.4",
                          userSelect: "text",
                          position: "absolute",
                          bottom: "2rem",
                          left: "50%",
                          transform: "translateX(-50%)",
                          zIndex: 1000,
                          boxShadow: "0 0 10px rgba(0,0,0,0.7)",
                        }}
                      >
                        <strong>{slide.title}</strong>
                        <div className="text-dark">{slide.description}</div>
                      </div>
                    ),
                  }}
                />
              </div>
            )}

            {activeTab === "gallery" && (
              <div>
                <h5>Gallery</h5>
                <div className="d-flex flex-wrap gap-3">
                  {galleryImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Gallery ${i}`}
                      className="rounded"
                      style={{
                        width: 200,
                        height: 120,
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setPhotoIndex(i);
                        setLightboxOpen(true);
                      }}
                    />
                  ))}
                </div>

                <Lightbox
                  open={lightboxOpen}
                  close={() => setLightboxOpen(false)}
                  slides={galleryImages.map((src) => ({ src }))}
                  index={photoIndex}
                  onIndexChange={setPhotoIndex}
                  plugins={[Thumbnails, Zoom]}
                />
              </div>
            )} */}
            
            {activeTab === "contact" && (
              <div>
                <h5>Contact</h5>
                <p>
                  <strong>Phone:</strong> {profile.mobile_number}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email || "Not Given" }
                </p>
                <p>
                  <strong>Address:</strong> {profile.door_no},{" "}
                  {profile.street_name}, {profile.area}, {profile.city},{" "}
                  {profile.pincode}
                </p>
                <div className="d-flex gap-2">
                  <button className="btn btn-success" onClick={handleCall}>
                    Call
                  </button>
                  <button className="btn btn-primary" onClick={handleEmail}>
                    Email
                  </button>
                  <button className="btn btn-warning" onClick={handleSMS}>
                    SMS
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Enquiry Form */}
          <div className="col-lg-3 mt-4 mt-lg-0">
            <div className="card p-3 shadow-sm">
              <h5>Send an Enquire {profile.business_name || profile.person_name}</h5>
              <textarea
                className="form-control mb-2"
                rows="4"
                placeholder="Type your enquiry..."
              />
              <input className="form-control mb-2" placeholder="Name" />
              <input className="form-control mb-2" placeholder="Phone Number" />
              <input className="form-control mb-3" placeholder="Email" />
              <button className="btn btn-primary w-100">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectoryIdDetails;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { supabase } from "../services/supabaseClient";
// import "../Css/DirectoryIdDetails.css";

// import Banner1 from "../assets/Images/Electrical.webp";
// import Banner2 from "../assets/Images/Electrical.webp";
// import Banner3 from "../assets/Images/Electrical.webp";
// import Product1 from "../assets/Images/Product1.png";
// import Product2 from "../assets/Images/Product2.png";
// import Product3 from "../assets/Images/Product3.png";
// import Product4 from "../assets/Images/Product4.png";

// const DirectoryIdDetails = () => {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [activeTab, setActiveTab] = useState("about");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("user_id", id)
//         .single();

//       if (data) setProfile(data);
//       else console.error("Error fetching profile:", error);
//     };

//     fetchProfile();
//   }, [id]);

//   if (!profile)
//     return <div className="p-4 text-center">Loading profile...</div>;

//   const products = [
//     {
//       name: "LED Bulb",
//       description: "Energy-efficient bulb with long lifespan.",
//       image: Product1,
//     },
//     {
//       name: "Solar Panel",
//       description: "High-efficiency solar panel perfect for renewable setups.",
//       image: Product2,
//     },
//     {
//       name: "Electric Drill",
//       description: "Compact and powerful drill for multiple uses.",
//       image: Product3,
//     },
//     {
//       name: "Welding Machine",
//       description: "Reliable arc welding machine for heavy-duty work.",
//       image: Product4,
//     },
//     {
//       name: "Hydraulic Pump",
//       description: "Durable high-pressure pump for industrial machinery.",
//       image: Product1,
//     },
//   ];

//   const galleryImages = [Banner1, Banner2, Banner3];

//   const handleCall = () =>
//     (window.location.href = `tel:${profile.mobile_number}`);
//   const handleEmail = () => (window.location.href = `mailto:${profile.email}`);
//   const handleSMS = () =>
//     (window.location.href = `sms:${profile.mobile_number}`);

//   return (
//     <div className="directory-details-page">
//       {/* Hero Header */}
//       <div className="heero-section position-relative">
//         <img src={Banner1} alt="Banner" className="hero-banner" />
//         <div className="hero-overlay"></div>
//         <div className="profile-card shadow-lg">
//           <img
//             src={profile.profile_image || "https://via.placeholder.com/100"}
//             alt="Profile"
//             className="profile-img"
//           />
//           <div>
//             <h2 className="mb-1">
//               {profile.business_name ||
//                 `${profile.prefix} ${profile.person_name}`}
//             </h2>
//             <p className="text-muted mb-0">
//               {profile.city} | GST: {profile.gst || "N/A"}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="container mt-5">
//         <div className="row">
//           {/* Left Tabs */}
//           <div className="col-lg-3 mb-4">
//             <div className="side-tabs shadow-sm rounded p-3">
//               {["about", "products", "gallery", "contact"].map((tab) => (
//                 <button
//                   key={tab}
//                   className={`side-tab-btn ${
//                     activeTab === tab ? "active" : ""
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="col-lg-6 mb-4">
//             <div className="content-area shadow-sm rounded p-4 bg-white">
//               {activeTab === "about" && (
//                 <>
//                   <h4>About</h4>
//                   <p>{profile.description}</p>
//                 </>
//               )}

//               {activeTab === "products" && (
//                 <>
//                   <h4>Products</h4>
//                   <div className="row g-3">
//                     {products.map((p, i) => (
//                       <div className="col-sm-6 col-md-4" key={i}>
//                         <div className="product-card shadow-sm p-2 rounded text-center h-100">
//                           <img
//                             src={p.image}
//                             alt={p.name}
//                             className="mb-2"
//                             style={{
//                               width: "100%",
//                               height: "120px",
//                               objectFit: "contain",
//                             }}
//                           />
//                           <h6 className="mb-1">{p.name}</h6>
//                           <p className="small text-muted">{p.description}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}

//               {activeTab === "gallery" && (
//                 <>
//                   <h4>Gallery</h4>
//                   <div className="gallery-grid">
//                     {galleryImages.map((img, i) => (
//                       <img
//                         key={i}
//                         src={img}
//                         alt={`Gallery ${i}`}
//                         className="gallery-img shadow-sm"
//                       />
//                     ))}
//                   </div>
//                 </>
//               )}

//               {activeTab === "contact" && (
//                 <>
//                   <h4>Contact</h4>
//                   <p>
//                     <strong>Phone:</strong> {profile.mobile_number}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {profile.email}
//                   </p>
//                   <p>
//                     <strong>Address:</strong> {profile.door_no},{" "}
//                     {profile.street_name}, {profile.area}, {profile.city},{" "}
//                     {profile.pincode}
//                   </p>
//                   <div className="d-flex gap-2 flex-wrap">
//                     <button className="btn btn-success" onClick={handleCall}>
//                       Call
//                     </button>
//                     <button className="btn btn-primary" onClick={handleEmail}>
//                       Email
//                     </button>
//                     <button className="btn btn-warning" onClick={handleSMS}>
//                       SMS
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Enquiry Card */}
//           <div className="col-lg-3">
//             <div
//               className="enquiry-card glass-card p-3 rounded shadow-lg position-sticky"
//               style={{ top: "100px" }}
//             >
//               <h5 className="mb-3">Enquire Now</h5>
//               <textarea
//                 className="form-control mb-2"
//                 rows="3"
//                 placeholder="Type your enquiry..."
//               />
//               <input className="form-control mb-2" placeholder="Name" />
//               <input className="form-control mb-2" placeholder="Phone Number" />
//               <input className="form-control mb-3" placeholder="Email" />
//               <button className="btn btn-primary w-100">Send</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DirectoryIdDetails;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { supabase } from "../services/supabaseClient";
// import "../Css/DirectoryIdDetails.css";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import Banner1 from "../assets/Images/Electrical.webp";
// import Banner2 from "../assets/Images/Electrical.webp";
// import Banner3 from "../assets/Images/Electrical.webp";
// import Product1 from "../assets/Images/Product1.png";
// import Product2 from "../assets/Images/Product2.png";
// import Product3 from "../assets/Images/Product3.png";
// import Product4 from "../assets/Images/Product4.png";

// const DirectoryIdDetails = () => {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [activeTab, setActiveTab] = useState("about");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("user_id", id)
//         .single();

//       if (data) setProfile(data);
//       else console.error("Error fetching profile:", error);
//     };

//     fetchProfile();
//   }, [id]);

//   if (!profile) return <div className="p-4 text-center">Loading profile...</div>;

//   const products = [
//     { name: "LED Bulb", description: "Energy-efficient bulb.", image: Product1 },
//     { name: "Solar Panel", description: "High-efficiency solar panel.", image: Product2 },
//     { name: "Electric Drill", description: "Compact and powerful drill.", image: Product3 },
//     { name: "Welding Machine", description: "Arc welding machine.", image: Product4 },
//     { name: "Hydraulic Pump", description: "Durable high-pressure pump.", image: Product1 },
//   ];

//   const galleryImages = [Banner1, Banner2, Banner3];

//   const handleCall = () => (window.location.href = `tel:${profile.mobile_number}`);
//   const handleEmail = () => (window.location.href = `mailto:${profile.email}`);
//   const handleSMS = () => (window.location.href = `sms:${profile.mobile_number}`);

//   return (
//     <div className="directory-details-page">
//       {/* Hero Carousel */}
//       <div className="container mt-4">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000 }}
//           loop
//           spaceBetween={15}
//           slidesPerView={4}
//           breakpoints={{
//             320: { slidesPerView: 1 },
//             576: { slidesPerView: 2 },
//             768: { slidesPerView: 3 },
//             992: { slidesPerView: 4 },
//           }}
//           className="hero-swiper"
//         >
//           {galleryImages.map((img, index) => (
//             <SwiperSlide key={index}>
//               <div className="hero-slide-wrapper">
//                 <img src={img} alt={`Banner ${index}`} className="hero-banner" />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Profile Card */}
//       <div className="container">
//         <div className="profile-card mt-4 shadow-sm p-3 rounded d-flex align-items-center gap-3">
//           <img
//             src={profile.profile_image || "https://via.placeholder.com/100"}
//             alt="Profile"
//             className="profile-img"
//           />
//           <div>
//             <h4 className="mb-1">
//               {profile.business_name || `${profile.prefix} ${profile.person_name}`}
//             </h4>
//             <p className="text-muted mb-0">
//               {profile.city} | GST: {profile.gst || "N/A"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Page Content */}
//       <div className="container mt-5">
//         <div className="row">
//           {/* Left Tabs */}
//           <div className="col-lg-3 mb-4">
//             <div className="side-tabs shadow-sm rounded p-3">
//               {["about", "products", "gallery", "contact"].map((tab) => (
//                 <button
//                   key={tab}
//                   className={`side-tab-btn ${activeTab === tab ? "active" : ""}`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="col-lg-6 mb-4">
//             <div className="content-area shadow-sm rounded p-4 bg-white">
//               {activeTab === "about" && (
//                 <>
//                   <h4>About</h4>
//                   <p>{profile.description}</p>
//                 </>
//               )}

//               {activeTab === "products" && (
//                 <>
//                   <h4>Products</h4>
//                   <div className="row g-3">
//                     {products.map((p, i) => (
//                       <div className="col-sm-6 col-md-4" key={i}>
//                         <div className="product-card shadow-sm p-2 rounded text-center h-100">
//                           <img
//                             src={p.image}
//                             alt={p.name}
//                             className="mb-2"
//                             style={{
//                               width: "100%",
//                               height: "120px",
//                               objectFit: "contain",
//                             }}
//                           />
//                           <h6 className="mb-1">{p.name}</h6>
//                           <p className="small text-muted">{p.description}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}

//               {activeTab === "gallery" && (
//                 <>
//                   <h4>Gallery</h4>
//                   <div className="gallery-grid">
//                     {galleryImages.map((img, i) => (
//                       <img
//                         key={i}
//                         src={img}
//                         alt={`Gallery ${i}`}
//                         className="gallery-img shadow-sm"
//                       />
//                     ))}
//                   </div>
//                 </>
//               )}

//               {activeTab === "contact" && (
//                 <>
//                   <h4>Contact</h4>
//                   <p>
//                     <strong>Phone:</strong> {profile.mobile_number}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {profile.email}
//                   </p>
//                   <p>
//                     <strong>Address:</strong> {profile.door_no},{" "}
//                     {profile.street_name}, {profile.area}, {profile.city},{" "}
//                     {profile.pincode}
//                   </p>
//                   <div className="d-flex gap-2 flex-wrap">
//                     <button className="btn btn-success" onClick={handleCall}>
//                       Call
//                     </button>
//                     <button className="btn btn-primary" onClick={handleEmail}>
//                       Email
//                     </button>
//                     <button className="btn btn-warning" onClick={handleSMS}>
//                       SMS
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Enquiry Card */}
//           <div className="col-lg-3">
//             <div
//               className="enquiry-card glass-card p-3 rounded shadow-lg position-sticky"
//               style={{ top: "100px" }}
//             >
//               <h5 className="mb-3">Enquire Now</h5>
//               <textarea
//                 className="form-control mb-2"
//                 rows="3"
//                 placeholder="Type your enquiry..."
//               />
//               <input className="form-control mb-2" placeholder="Name" />
//               <input className="form-control mb-2" placeholder="Phone Number" />
//               <input className="form-control mb-3" placeholder="Email" />
//               <button className="btn btn-primary w-100">Send</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DirectoryIdDetails;

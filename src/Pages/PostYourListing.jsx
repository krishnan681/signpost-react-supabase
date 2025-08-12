// import React, { useState } from "react";
// import "../Css/PostYourListing.css";

// const PostYourListing = () => {
//   const [listingType, setListingType] = useState("free");
//   const [uploadedImages, setUploadedImages] = useState([]);

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const imageUrls = files.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//     }));
//     setUploadedImages((prev) => [...prev, ...imageUrls].slice(0, 3)); // Limit to 3 images
//   };

//   const removeImage = (index) => {
//     setUploadedImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="listing-container">
//       <h2 className="title">Post Your Listing</h2>

//       <div className="form-wrapper">
//         {/* Left Panel */}
//         <div className="form-left">
//           <input
//             type="text"
//             placeholder="Business Name"
//             className="input-field"
//           />
//           <input type="text" placeholder="Owner Name" className="input-field" />
//           <input type="text" placeholder="Address" className="input-field" />
//           <input type="text" placeholder="Mail ID" className="input-field" />
//           <input
//             type="text"
//             placeholder="Phone Number"
//             className="input-field"
//           />
//           <input
//             type="text"
//             placeholder="Additional Phone Number"
//             className="input-field"
//           />

//           <div className="keywords-section">
//             <label>Products - Keywords</label>
//             <div className="keyword-boxes">
//               {[...Array(5)].map((_, idx) => (
//                 <input
//                   key={idx}
//                   type="text"
//                   placeholder={`Keyword ${idx + 1}`}
//                   className="keyword-input"
//                 />
//               ))}
//               <textarea
//                 className="textarea-input"
//                 placeholder="Additional Info"
//               ></textarea>
//             </div>
//           </div>

//           <input type="text" placeholder="Contact" className="input-field" />

//           {listingType === "premium" && (
//             <div className="upload-section">
//               <label htmlFor="image-upload" className="upload-button">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="currentColor"
//                   viewBox="0 0 16 16"
//                 >
//                   <path d="M10.5 8a2.5 2.5 0 1 1-5.001-.001A2.5 2.5 0 0 1 10.5 8z" />
//                   <path d="M4.002 2a1 1 0 0 0-.95.684L2.217 5H1a1 1 0 0 0-1 1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1h-1.217l-.835-2.316A1 1 0 0 0 11.998 2H4.002zM3.437 5l.5-1.316A1 1 0 0 1 4.934 3h6.132a1 1 0 0 1 .997.684L12.563 5H3.437z" />
//                 </svg>
//                 Upload Images
//               </label>

//               <input
//                 type="file"
//                 id="image-upload"
//                 accept="image/*"
//                 multiple
//                 style={{ display: "none" }}
//                 onChange={handleImageUpload}
//               />

//               {uploadedImages.length > 0 && (
//                 <div className="preview-circles">
//                   {uploadedImages.map((img, idx) => (
//                     <div key={idx} className="circle preview">
//                       <img src={img.url} alt={`preview-${idx}`} />
//                       <span
//                         className="remove-image"
//                         onClick={() => removeImage(idx)}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="12"
//                           height="12"
//                           viewBox="0 0 16 16"
//                           fill="currentColor"
//                         >
//                           <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
//                         </svg>
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Right Panel */}
//         <div className="form-right">
//           <div
//             className={`radio-box premium-box ${
//               listingType === "premium" ? "selected" : ""
//             }`}
//           >
//             <label>
//               <input
//                 type="radio"
//                 value="premium"
//                 checked={listingType === "premium"}
//                 onChange={() => setListingType("premium")}
//               />
//               Premium Listing
//             </label>
//             <ul className="features-list">
//               <li>High visibility on platform</li>
//               <li>Image gallery support</li>
//               <li>Top placement in search</li>
//               <li>24/7 customer support</li>
//             </ul>
//           </div>

//           <div
//             className={`radio-box ${listingType === "free" ? "selected" : ""}`}
//           >
//             <label>
//               <input
//                 type="radio"
//                 value="free"
//                 checked={listingType === "free"}
//                 onChange={() => setListingType("free")}
//               />
//               Free Listing
//             </label>
//             <ul className="features-list">
//               <li>Basic listing details</li>
//               <li>Limited visibility</li>
//               <li>No images allowed</li>
//               <li>Email support only</li>
//             </ul>
//           </div>

//           <div className="button-group">
//             {listingType === "premium" ? (
//               <button className="btn pay-btn">Register and Pay</button>
//             ) : (
//               <button className="btn register-btn">Register</button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostYourListing;

import React, { useState } from "react";
import "../Css/PostYourListing.css";

// Import your PNG images here (adjust paths as needed)
import VerifiedPng from "../assets/Images/HowitWorks1.png";
import ChatCallPng from "../assets/Images/HowitWorks2.png";
import GrowthUserPng from "../assets/Images/HowitWorks3.png";

const PostYourListing = () => {
  const [listingType, setListingType] = useState("free");
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setUploadedImages((prev) => [...prev, ...imageUrls].slice(0, 3)); // Limit to 3 images
  };

  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* New "How does Phonebook work?" section */}
      <section className="phonebook-how-it-works">
        <h2 className="phonebook-title">How does Phonebook work?</h2>
        <p className="phonebook-subtitle">
          Subscribe, get verified leads, and grow your business.
        </p>
        <div className="phonebook-cards-container">
          <div className="phonebook-card">
            <div className="icon-wrapper verified-icon-wrapper">
              <img
                src={VerifiedPng}
                 
                 
              />
              {/* <span className="verified-badge">Verified</span> */}
            </div>
            <h3>Receive an enquiry from Phonebook</h3>
            <p>
              We match your business with suitable customers. Customers can
              approach you directly, too!
            </p>
          </div>
          <div className="phonebook-card">
            <div className="icon-wrapper chat-call-icon-wrapper">
              <img
                src={ChatCallPng}
                 
                
              />
            </div>
            <h3>Connect with customers over call &amp; chat</h3>
            <p>
              Get ahead of your competitors and connect with customers right
              away.
            </p>
          </div>
          <div className="phonebook-card">
            <div className="icon-wrapper growth-user-icon-wrapper">
              <img
                src={GrowthUserPng}
             
              />
            </div>
            <h3>Convert and grow your business</h3>
            <p>Stay active on Phonebook and keep growing.</p>
          </div>
        </div>
      </section>
      <div className="listing-container">
        <h2 className="title">Post Your Listing</h2>

        <div className="form-wrapper">
          {/* Left Panel */}
          <div className="form-left">
            <input
              type="text"
              placeholder="Business Name"
              className="input-field"
            />
            <input
              type="text"
              placeholder="Owner Name"
              className="input-field"
            />
            <input type="text" placeholder="Address" className="input-field" />
            <input type="text" placeholder="Mail ID" className="input-field" />
            <input
              type="text"
              placeholder="Phone Number"
              className="input-field"
            />
            <input
              type="text"
              placeholder="Additional Phone Number"
              className="input-field"
            />

            <div className="keywords-section">
              <label>Products - Keywords</label>
              <div className="keyword-boxes">
                {[...Array(5)].map((_, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Keyword ${idx + 1}`}
                    className="keyword-input"
                  />
                ))}
                <textarea
                  className="textarea-input"
                  placeholder="Additional Info"
                ></textarea>
              </div>
            </div>

            <input type="text" placeholder="Contact" className="input-field" />

            {listingType === "premium" && (
              <div className="upload-section">
                <label htmlFor="image-upload" className="upload-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5.001-.001A2.5 2.5 0 0 1 10.5 8z" />
                    <path d="M4.002 2a1 1 0 0 0-.95.684L2.217 5H1a1 1 0 0 0-1 1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1h-1.217l-.835-2.316A1 1 0 0 0 11.998 2H4.002zM3.437 5l.5-1.316A1 1 0 0 1 4.934 3h6.132a1 1 0 0 1 .997.684L12.563 5H3.437z" />
                  </svg>
                  Upload Images
                </label>

                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />

                {uploadedImages.length > 0 && (
                  <div className="preview-circles">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="circle preview">
                        <img src={img.url} alt={`preview-${idx}`} />
                        <span
                          className="remove-image"
                          onClick={() => removeImage(idx)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                          </svg>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel */}

          <div className="form-right">
            {/* Gold Listing */}
            <div
              className={`radio-box gold-box ${
                listingType === "gold" ? "selected" : ""
              }`}
            >
              <label>
                <input
                  type="radio"
                  value="gold"
                  checked={listingType === "gold"}
                  onChange={() => setListingType("gold")}
                />
                Gold Listing
              </label>
              <ul className="features-list">
                <li>✅High visibility on platform</li>
                <li>✅Image gallery support</li>
                <li>✅Priority placement in search</li>
                <li>✅Dedicated customer support</li>
              </ul>
            </div>

            {/* Platinum Listing */}
            <div
              className={`radio-box platinum-box ${
                listingType === "platinum" ? "selected" : ""
              }`}
            >
              <label>
                <input
                  type="radio"
                  value="platinum"
                  checked={listingType === "platinum"}
                  onChange={() => setListingType("platinum")}
                />
                Platinum Listing
              </label>
              <ul className="features-list">
                <li>✅Maximum visibility</li>
                <li>✅Unlimited images</li>
                <li>✅Top placement in search results</li>
                <li>✅24/7 priority customer support</li>
              </ul>
            </div>

            {/* Free Listing */}
            <div
              className={`radio-box free-box ${
                listingType === "free" ? "selected" : ""
              }`}
            >
              <label>
                <input
                  type="radio"
                  value="free"
                  checked={listingType === "free"}
                  onChange={() => setListingType("free")}
                />
                Free Listing
              </label>
              <ul className="features-list">
                <li>✅Basic listing details</li>
                <li>✅Limited visibility</li>
                <li>❌No images allowed</li>
                <li>✅Email support only</li>
              </ul>
            </div>

            <div className="button-group">
              {listingType === "gold" || listingType === "platinum" ? (
                <button className="btn pay-btn">Register and Pay</button>
              ) : (
                <button className="btn register-btn">Register</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="callback-section">
        <p className="callback-subtitle">TALK TO US TO LIST YOUR BUSINESS</p>
        <h2 className="callback-title">
          Still have queries! Request a call back Now!
        </h2>
        <a href="tel:95145 55132" className="callback-button">
          Call me back Now
        </a>
      </section>
    </>
  );
};

export default PostYourListing;

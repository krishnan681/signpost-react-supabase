import React, { useState } from "react";
import "../Css/PostYourListing.css";

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
          <input type="text" placeholder="Owner Name" className="input-field" />
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
          <div
            className={`radio-box premium-box ${
              listingType === "premium" ? "selected" : ""
            }`}
          >
            <label>
              <input
                type="radio"
                value="premium"
                checked={listingType === "premium"}
                onChange={() => setListingType("premium")}
              />
              Premium Listing
            </label>
            <ul className="features-list">
              <li>High visibility on platform</li>
              <li>Image gallery support</li>
              <li>Top placement in search</li>
              <li>24/7 customer support</li>
            </ul>
          </div>

          <div
            className={`radio-box ${listingType === "free" ? "selected" : ""}`}
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
              <li>Basic listing details</li>
              <li>Limited visibility</li>
              <li>No images allowed</li>
              <li>Email support only</li>
            </ul>
          </div>

          <div className="button-group">
            {listingType === "premium" ? (
              <button className="btn pay-btn">Register and Pay</button>
            ) : (
              <button className="btn register-btn">Register</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostYourListing;

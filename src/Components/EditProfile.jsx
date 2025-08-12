import React from "react";

const EditProfile = () => {
  return (
    <>
      <h2>Edit Profile</h2>
      <div className="profile-image-section">
        <img
          src="https://i.pravatar.cc/150?img=65"
          alt="Profile"
          className="profile-img"
        />
        <span className="edit-icon">✎</span>
      </div>
      <div className="form-group">
        <label>Full Name</label>
        <input type="text" defaultValue="Zhenya Rynzhuk" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" defaultValue="zhenyarynzhuk@gmail.com" />
        <span className="verified-dot" />
      </div>
      <div className="form-group">
        <label>Number</label>
        <input type="text" defaultValue="587-556-998-02" />
        <span className="verified-dot" />
      </div>
      <div className="form-group">
        <label>City</label>
        <input type="text" defaultValue="Sanghai, Chaina." />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>State</label>
          <input type="text" defaultValue="Mallen" />
        </div>
        <div className="form-group">
          <label>Zip Code</label>
          <input type="text" defaultValue="7789" />
        </div>
      </div>
      <div className="form-group">
        <label>Country</label>
        <input type="text" defaultValue="Chaina" />
      </div>
      <div className="button-row">
        <button className="back-btn">Back To Home</button>
        <button className="save-btn">Save Changes</button>
      </div>
    </>
  );
};

export default EditProfile;

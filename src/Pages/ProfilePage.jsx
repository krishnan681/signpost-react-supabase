// src/pages/ProfilePage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { userData } = useAuth();

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Profile</h2>
      {userData ? (
        <div className="card p-4 shadow">
          <p><strong>Name:</strong> {userData.person_name || userData.business_name}</p>
          <p><strong>Mobile Number:</strong> {userData.mobile_number}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>City:</strong> {userData.city}</p>
          <p><strong>Pincode:</strong> {userData.pincode}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default ProfilePage;

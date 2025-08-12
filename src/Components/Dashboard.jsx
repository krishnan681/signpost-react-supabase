// src/pages/DashboardPage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { userData } = useAuth();

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Profile Summary</h2>
      {userData ? (
        <div className="p-4">
          <p>
            <strong>Name:</strong>{" "}
            {userData.person_name || userData.business_name}
          </p>
          <p>
            <strong>Mobile:</strong> {userData.mobile_number}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>City:</strong> {userData.city}
          </p>
           
          <p>
            <strong>Pincode:</strong> {userData.pincode}
          </p>

          <p>
            <strong>Keywords:</strong> {userData.keywords?.join(", ")}
          </p>
          <p>
            <strong>Description:</strong> {userData.description}
          </p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DashboardPage;

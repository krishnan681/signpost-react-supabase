import React, { useEffect, useState } from "react";
import "../Css/ProfilePage.css";

import Dashboard from "../Components/Dashboard";
import Favourites from "../Components/Favourites"; 
import EditProfile from "../Components/EditProfile";
import Settings from "../Components/Settings";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const savedSection = localStorage.getItem("activeSection");
    if (savedSection) {
      setActiveSection(savedSection);
    }
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    localStorage.setItem("activeSection", section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "favourites":
        return <Favourites />;
      case "setting":
        return <Settings />;
      case "edit-profile":
        return <EditProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="sidebar">
        <div className="logo">Phonebook</div>
        <ul className="nav-links">
          <li
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => handleSectionChange("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activeSection === "favourites" ? "active" : ""}
            onClick={() => handleSectionChange("favourites")}
          >
            Favourites
          </li>
          <li
            className={activeSection === "setting" ? "active" : ""}
            onClick={() => handleSectionChange("setting")}
          >
            Setting
          </li>
          <li className={activeSection === "edit-profile" ? "active" : ""}
          onClick={() => handleSectionChange("edit-profile")}
          >
            Profile
            
          </li>
          <li className={activeSection === "edit-profile" ? "active" : ""}
          onClick={() => handleSectionChange("edit-profile")}
          >
            MemberShip Card
            
          </li>
        </ul>
      </div>

      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default ProfilePage;

// import React from "react";
// import {
//   FaStore,
//   FaIndustry,
//   FaUtensils,
//   FaLaptopCode,
//   FaTools,
//   FaPaperPlane,
//   FaSearch,
//   FaUnlockAlt
// } from "react-icons/fa";
// import "../css/LandingPageDataBase.css";

// const LandingPageDataBase = () => {
//   return (
//     <section id="database" className="msme-section">
//       <div className="msme-container">
//         {/* Heading */}
//         <div className="msme-header">
//           <h2>Explore Our MSME Database</h2>
//           <p>
//             Find and connect with the perfect businesses for your products or
//             services
//           </p>
//         </div>

//         {/* Search & Filters */}
//         <div className="msme-search-card">
//           <div className="msme-search-bar">
//             <input type="text" placeholder="Search by business name..." />
//             <select>
//               <option>All Categories</option>
//               <option>Retail</option>
//               <option>Manufacturing</option>
//               <option>Services</option>
//               <option>Food & Beverage</option>
//             </select>
//             <select>
//               <option>All Locations</option>
//               <option>Delhi NCR</option>
//               <option>Mumbai</option>
//               <option>Bangalore</option>
//               <option>Hyderabad</option>
//             </select>
//             <button className="msme-search-btn">
//               <FaSearch /> Search
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="msme-table-wrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th>Business Name</th>
//                 <th>Category</th>
//                 <th>Location</th>
//                 <th>Contact</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 {
//                   name: "Premium Textiles",
//                   icon: <FaStore className="msme-icon msme-indigo" />,
//                   est: "Est. 2015",
//                   category: "Retail",
//                   sub: "Fashion",
//                   location: "Mumbai, Maharashtra",
//                   pin: "400001",
//                   phone: "+91 98765 43210",
//                   email: "contact@premiumtextiles.com"
//                 },
//                 {
//                   name: "Metro Steel Works",
//                   icon: <FaIndustry className="msme-icon msme-blue" />,
//                   est: "Est. 2008",
//                   category: "Manufacturing",
//                   sub: "Steel Fabrication",
//                   location: "Gurugram, Haryana",
//                   pin: "122001",
//                   phone: "+91 98765 43211",
//                   email: "sales@metroteel.com"
//                 },
//                 {
//                   name: "Spice Trail Restaurant",
//                   icon: <FaUtensils className="msme-icon msme-green" />,
//                   est: "Est. 2018",
//                   category: "Food & Beverage",
//                   sub: "Restaurant",
//                   location: "Bangalore, Karnataka",
//                   pin: "560001",
//                   phone: "+91 98765 43212",
//                   email: "info@spicetrail.com"
//                 },
//                 {
//                   name: "TechSolutions IT",
//                   icon: <FaLaptopCode className="msme-icon msme-purple" />,
//                   est: "Est. 2012",
//                   category: "Services",
//                   sub: "IT Services",
//                   location: "Hyderabad, Telangana",
//                   pin: "500001",
//                   phone: "+91 98765 43213",
//                   email: "support@techsolutions.com"
//                 },
//                 {
//                   name: "Precision Hardware",
//                   icon: <FaTools className="msme-icon msme-yellow" />,
//                   est: "Est. 2010",
//                   category: "Manufacturing",
//                   sub: "Hardware",
//                   location: "Chennai, Tamil Nadu",
//                   pin: "600001",
//                   phone: "+91 98765 43214",
//                   email: "sales@precisionhw.com"
//                 }
//               ].map((item, index) => (
//                 <tr key={index}>
//                   <td>
//                     <div className="msme-table-cell-icon">
//                       <div className="msme-icon-circle">{item.icon}</div>
//                       <div>
//                         <div className="msme-title">{item.name}</div>
//                         <div className="msme-subtitle">{item.est}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     <div className="msme-title">{item.category}</div>
//                     <div className="msme-subtitle">{item.sub}</div>
//                   </td>
//                   <td>
//                     <div className="msme-title">{item.location}</div>
//                     <div className="msme-subtitle">{item.pin}</div>
//                   </td>
//                   <td>
//                     <div className="msme-title">{item.phone}</div>
//                     <div className="msme-subtitle">{item.email}</div>
//                   </td>
//                   <td>
//                     <button className="msme-contact-btn">
//                       <FaPaperPlane /> Contact
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="msme-pagination">
//           <div>Showing 1 to 5 of 25 results</div>
//           <div className="msme-pagination-buttons">
//             <button>Previous</button>
//             <button className="active">1</button>
//             <button>2</button>
//             <button>3</button>
//             <button>Next</button>
//           </div>
//         </div>

//         {/* Call to action */}
//         <div className="msme-cta">
//           <p>Want to access our full database of 5M+ MSMEs?</p>
//           <a href="#contact" className="msme-cta-btn">
//             <FaUnlockAlt /> Get Full Access Now
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LandingPageDataBase;

import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaUnlockAlt,
  FaStore,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import "../css/LandingPageDataBase.css";
import { useNavigate } from "react-router-dom";

const LandingPageDataBase = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [professionSearch, setProfessionSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  const { userData } = useAuth();

  // Fetch data from Supabase with optional filters
  const fetchDirectoryData = async () => {
    let query = supabase
      .from("profiles")
      .select("*")
      .order("user_id", { ascending: false });

    if (searchName.trim()) {
      query = query.ilike("business_name", `%${searchName}%`);
    }
    if (professionSearch.trim()) {
      query = query.or(
        `profession.ilike.%${professionSearch}%,keywords.cs.{${professionSearch}}`
      );
    }

    const { data, error } = await query;
    if (!error) {
      setAllRecords(data);
      setCurrentPage(1);
    } else {
      console.error("Fetch Error:", error.message);
    }
  };

  const handleBrowseMore = () => {
    if (!userData) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in to access the full database.",
        confirmButtonText: "OK",
      });
      return;
    }
    navigate("/DirectoryPage?showAll=true");
  };

  // ✅ Runs when Search button is clicked
  const handleSearchClick = () => {
    if (!userData) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in to search the database.",
        confirmButtonText: "OK",
      });
      return;
    }
    fetchDirectoryData();
  };

  // ✅ Initial load → fetch all records without login check
  useEffect(() => {
    supabase
      .from("profiles")
      .select("*")
      .order("user_id", { ascending: false })
      .then(({ data, error }) => {
        if (!error) setAllRecords(data);
      });
  }, []);

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = allRecords.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(allRecords.length / rowsPerPage);

  return (
    <section id="database" className="msme-section">
      <div className="msme-container">
        {/* Header */}
        <div className="msme-header">
          <h2>Explore Our PhoneBook Database</h2>
          <p>
            Find and connect with the perfect businesses for your products or
            services
          </p>
        </div>

        {/* Search */}
        <div className="msme-search-card">
          <div className="msme-search-bar">
            <input
              type="text"
              placeholder="Search by business name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by profession or keywords..."
              value={professionSearch}
              onChange={(e) => setProfessionSearch(e.target.value)}
            />
            <button className="msme-search-btn" onClick={handleSearchClick}>
              <FaSearch /> Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="msme-table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Business/Person Name</th>
                <th>Product/Profession</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Send Enquire</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((item) => (
                  <tr key={item.id}>
                    <td data-label="BUSINESS NAME">
                      <div className="name-wrapper">
                        <div className="icon-circle">
                          {item.business_name ? <FaStore /> : <FaUser />}
                        </div>
                        <div>
                          <div className="main-text">
                            {item.business_name || item.person_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td data-label="CATEGORY">
                      <div className="main-text">
                        {item.keywords || item.profession}
                      </div>
                      <div className="sub-text">
                        {Array.isArray(item.keywords)
                          ? item.keywords.join(", ")
                          : ""}
                      </div>
                    </td>
                    <td data-label="LOCATION">
                      <div className="main-text">{item.city || "-"}</div>
                      <div className="sub-text">{item.pincode || "-"}</div>
                    </td>
                    <td data-label="CONTACT">
                      <div className="main-text">
                        {item.mobile_number
                          ? item.mobile_number.slice(0, 5) + "xxxxx"
                          : "-"}
                      </div>
                      <div className="sub-text">{item.email || "-"}</div>
                    </td>
                    <td data-label="ACTION">
                      <button className="contact-btn">
                        <FaPaperPlane /> Contact
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="msme-cta" onClick={handleBrowseMore}>
          <p>Want to access our full database of 5M+ MSMEs?</p>
          <button className="msme-cta-btn">
            <FaUnlockAlt />
            {userData ? "Get Started" : "Get Full Access Now"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingPageDataBase;

// import { useState } from "react";
// import { supabase } from "../../services/supabaseClient";
// import { FaBriefcase, FaUser } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [accountType, setAccountType] = useState(null);
//   const [formData, setFormData] = useState({
//     mobile_no: "",
//     person_prefix: "",
//     person_name: "",
//     business_name: "",
//     product: "",
//     address: "",
//     city: "",
//     pincode: "",
//     email_id: "",
//     Description: "",
//   });

//   const handleChoose = (type) => {
//     setAccountType(type);
//     setFormData({
//       mobile_no: "",
//       person_prefix: "",
//       person_name: "",
//       business_name: "",
//       product: "",
//       address: "",
//       city: "",
//       pincode: "",
//       email_id: "",
//       Description: "",
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBack = () => setAccountType(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = [];

//     // Validate mobile number
//     if (!/^[6-9]\d{9,14}$/.test(formData.mobile_no)) {
//       errors.push("Mobile number must start with 6-9 and be 10 to 15 digits.");
//     }

//     if (accountType === "person" && !formData.person_name.trim()) {
//       errors.push("Person name is required.");
//     }

//     if (accountType === "business") {
//       if (!formData.business_name.trim()) {
//         errors.push("Business name is required.");
//       }
//       if (!formData.product.trim()) {
//         errors.push("Product is required.");
//       }
//     }

//     if (errors.length > 0) {
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error",
//         html: errors.join("<br>"),
//       });
//       return;
//     }

//     const commonFields = {
//       mobile_no: formData.mobile_no,
//       address: formData.address || null,
//       city: formData.city || null,
//       pincode: formData.pincode || null,
//       email_id: formData.email_id || null,
//       Description: formData.Description || null,
//     };

//     const dataToInsert =
//       accountType === "person"
//         ? {
//             ...commonFields,
//             person_prefix: formData.person_prefix || null,
//             person_name: formData.person_name || null,
//             business_name: null,
//             product: null,
//           }
//         : {
//             ...commonFields,
//             business_name: formData.business_name || null,
//             product: formData.product || null,
//             person_prefix: null,
//             person_name: null,
//           };

//     const { error } = await supabase
//       .from("Directory_Data")
//       .insert([dataToInsert]);

//     if (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Signup Failed",
//         text: error.message,
//       });
//     } else {
//       Swal.fire({
//         icon: "success",
//         title: "Account Created",
//         // text: "You will be redirected to login page.",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       setTimeout(() => {
//         setAccountType(null); // Clear account type toggle
//         setFormData({
//           mobile_no: "",
//           address: "",
//           city: "",
//           pincode: "",
//           email_id: "",
//           Description: "",
//           person_prefix: "",
//           person_name: "",
//           business_name: "",
//           product: "",
//         }); // Reset form
//         navigate("/Login");
//       }, 2000);
//     }
//   };

//   return (
//     <div className="container py-5">
//       {!accountType && (
//         <div className="card p-4 shadow-sm">
//           <h2 className="text-center fw-bold">Choose account type</h2>
//           <p className="text-center">
//             Already have an account? <a href="/Login">Sign in</a>
//           </p>

//           <div className="row g-4 mt-4 flex-column flex-md-row justify-content-center">
//             <div className="col-12 col-md-6">
//               <div
//                 className="border rounded text-center p-4 h-100"
//                 onClick={() => handleChoose("person")}
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="fs-1 text-primary mb-2">
//                   <FaUser />
//                 </div>
//                 <h5 className="fw-bold">Person</h5>
//                 <p>Looking for services? Create an account and explore.</p>
//                 <button className="btn btn-primary btn-sm">
//                   Create a Person Account
//                 </button>
//               </div>
//             </div>

//             <div className="col-12 col-md-6">
//               <div
//                 className="border rounded text-center p-4 h-100"
//                 onClick={() => handleChoose("business")}
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="fs-1 text-warning mb-2">
//                   <FaBriefcase />
//                 </div>
//                 <h5 className="fw-bold">Business</h5>
//                 <p>Promote your business and reach your audience.</p>
//                 <button className="btn btn-warning btn-sm text-white">
//                   Create a Business Account
//                 </button>
//               </div>
//             </div>
//           </div>

//           <p className="text-center mt-4 small">
//             By creating an account, you agree to our{" "}
//             <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
//           </p>
//         </div>
//       )}

//       {accountType === "person" && (
//         <div className="card p-4 shadow-sm">
//           <h3 className="text-center mb-4">Create Person Account</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="row g-3">
//               <div className="col-md-6">
//                 <label>Mobile Number</label>
//                 <input
//                   name="mobile_no"
//                   value={formData.mobile_no}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label>Prefix</label>
//                 <div className="d-flex gap-2">
//                   {["Mr", "Ms", "Mrs"].map((prefix) => (
//                     <div className="form-check" key={prefix}>
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="person_prefix"
//                         value={prefix}
//                         checked={formData.person_prefix === prefix}
//                         onChange={handleChange}
//                       />
//                       <label className="form-check-label">{prefix}</label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <input
//                   name="person_name"
//                   placeholder="Person Name"
//                   value={formData.person_name}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="col-md-6">
//                 <input
//                   name="address"
//                   placeholder="Address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <input
//                   name="city"
//                   placeholder="City"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <input
//                   name="pincode"
//                   placeholder="Pincode"
//                   value={formData.pincode}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <input
//                   name="email_id"
//                   placeholder="Email"
//                   value={formData.email_id}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-12">
//                 <textarea
//                   name="Description"
//                   placeholder="Description"
//                   value={formData.Description}
//                   onChange={handleChange}
//                   className="form-control"
//                   rows="3"
//                 />
//               </div>
//               <div className="col-12 text-center">
//                 <button className="btn btn-primary">Submit</button>
//                 <button
//                   type="button"
//                   className="btn btn-link ms-3"
//                   onClick={handleBack}
//                 >
//                   ← Back
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       )}

//       {accountType === "business" && (
//         <div className="card p-4 shadow-sm">
//           <h3 className="text-center mb-4">Create Business Account</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="row g-3">
//               <div className="col-md-6">
//                 <label>Mobile Number</label>
//                 <input
//                   name="mobile_no"
//                   value={formData.mobile_no}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label>Prefix</label>
//                 <input
//                   name="person_prefix"
//                   placeholder="Prefix"
//                   value={formData.person_prefix}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <input
//                   name="business_name"
//                   placeholder="Business Name"
//                   value={formData.business_name}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <div className="col-md-6">
//                 <input
//                   name="product"
//                   placeholder="Product"
//                   value={formData.product}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <input
//                   name="address"
//                   placeholder="Address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <input
//                   name="city"
//                   placeholder="City"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <input
//                   name="pincode"
//                   placeholder="Pincode"
//                   value={formData.pincode}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <input
//                   name="email_id"
//                   placeholder="Email"
//                   value={formData.email_id}
//                   onChange={handleChange}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-12">
//                 <textarea
//                   name="Description"
//                   placeholder="Description"
//                   value={formData.Description}
//                   onChange={handleChange}
//                   className="form-control"
//                   rows="3"
//                 />
//               </div>
//               <div className="col-12 text-center">
//                 <button className="btn btn-warning text-white">Submit</button>
//                 <button
//                   type="button"
//                   className="btn btn-link ms-3"
//                   onClick={handleBack}
//                 >
//                   ← Back
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Signup;

// src/pages/Signup.jsx

import { useState, useEffect } from "react";

import { supabase } from "../../services/supabaseClient";
import "../../Css/Auth/Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [profileType, setProfileType] = useState(null);
  const [formData, setFormData] = useState({});
  const [mobileExists, setMobileExists] = useState(false);

  useEffect(() => {
    const checkMobile = async () => {
      if (formData.mobile_number?.length === 10) {
        const { data: existingUser } = await supabase
          .from("profiles")
          .select("id")
          .eq("mobile_number", formData.mobile_number)
          .single();

        setMobileExists(!!existingUser);
      } else {
        setMobileExists(false);
      }
    };

    checkMobile();
  }, [formData.mobile_number]);

  const getInitialState = (type) => {
    return type === "business"
      ? {
          profile_type: "business",
          mobile_number: "",
          business_name: "",
          owner_name: "",
          owner_prefix: "",
          keywords: [],
          description: "",
          landline_code: "",
          landline_number: "",
          door_no: "",
          street_name: "",
          area: "",
          city: "",
          pincode: "",
          email: "",
          promo_code: "",
          business_prefix: "M/s.", // ✅ Add this
        }
      : {
          profile_type: "person",
          mobile_number: "",
          person_name: "",
          person_prefix: "",
          profession: "",
          landline_code: "",
          landline_number: "",
          door_no: "",
          street_name: "",
          area: "",
          city: "",
          pincode: "",
          email: "",
          promo_code: "",
        };
  };

  const handleTypeSelection = (type) => {
    setProfileType(type);
    setFormData(getInitialState(type));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "keywords") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((kw) => kw.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const validateForm = () => {
  const requiredFields = [
    "mobile_number",
    "business_name",
    "keywords",
    "door_no",
    "street_name",
    "area",
    "city",
    "pincode",
  ];

  for (let field of requiredFields) {
    if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
      alert(`${field.replace(/_/g, " ")} is required.`);
      return false;
    }
  }

  const mobilePattern = /^[6-9]\d{9}$/;
  if (!mobilePattern.test(formData.mobile_number)) {
    alert("Invalid mobile number (must start with 6-9 and be 10 digits)");
    return false;
  }

  return true;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Optional: get user ID if you're using Supabase Auth
    const user_id = null; // or session?.user?.id;

    const cleanedData = Object.fromEntries(
      Object.entries({
        ...formData,
        user_id,
      }).map(([key, value]) => [key, value === "" ? null : value])
    );

    // ✅ Check for existing mobile number
    const { data: existingUser, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("mobile_number", cleanedData.mobile_number)
      .single();

    if (mobileExists) {
      alert("Mobile number is already registered.");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert([cleanedData]);

    if (error) {
      console.error("Supabase Error:", error);
      alert("Error submitting form");
    } else {
      alert("Form submitted successfully!");
      setFormData(getInitialState(profileType));
    }
  };

  if (!profileType) {
    return (
      <div className="WholeSection  d-flex align-items-center justify-content-center">
        <div className="card p-4 shadow" style={{ width: "90%" }}>
          <h2 className="text-center fw-bold">Choose account type</h2>
          <p className="text-center">
            Already have an account? <a href="/login">Sign in</a>
          </p>

          <div className="row mt-4">
            <div className="col-md-6 mb-3">
              <div className="border rounded text-center p-4 h-100">
                {/* Person SVG */}
                <div className="mb-3">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="#007bff"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 1.2c-3.2 0-9.6 1.6-9.6 4.8V21h19.2v-3c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <h5 className="fw-bold">Person</h5>
                <p>Looking for services? Create an account and explore.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleTypeSelection("person")}
                >
                  Create a Person Account
                </button>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="border rounded text-center p-4 h-100">
                {/* Business SVG */}
                <div className="mb-3">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="#fbbd08"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm4 2h4v2h-4V8zm0 4h4v2h-4v-2z" />
                  </svg>
                </div>
                <h5 className="fw-bold">Business</h5>
                <p>Promote your business and reach your audience.</p>
                <button
                  className="btn btn-warning text-white"
                  onClick={() => handleTypeSelection("business")}
                >
                  Create a Business Account
                </button>
              </div>
            </div>
          </div>

          <p className="text-center mt-4 small">
            By creating an account, you agree to our{" "}
            <a href="/terms">Terms of Service</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>
      </div>
    );
  }

  // Render form after selection
  return (
    <div className="signup-container">
      <div className="form-card">
        {/* <div className="toggle-buttons mb-3 text-center">
          <button
            className={`btn btn-sm ${
              profileType === "business" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handleTypeSelection("business")}
          >
            Business
          </button>
          <button
            className={`btn btn-sm ms-2 ${
              profileType === "person" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handleTypeSelection("person")}
          >
            Person
          </button>
        </div> */}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Mobile Number *</label>
              <input
                type="text"
                className="form-control"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
              />
              {mobileExists && (
                <small className="text-danger">
                  Mobile number is already registered.
                </small>
              )}
            </div>

            {profileType === "business" ? (
              <>
                <div className="col-md-6 mb-3">
                  <label>Business Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Owner Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="owner_name"
                    value={formData.owner_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="d-block mb-2">Owner Prefix *</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="owner_prefix"
                      value="Mr."
                      checked={formData.owner_prefix === "Mr."}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Mr.</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="owner_prefix"
                      value="Ms."
                      checked={formData.owner_prefix === "Ms."}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Ms.</label>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <label>Keywords (comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="keywords"
                    value={formData.keywords.join(", ")}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-3">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="col-md-6 mb-3">
                  <label>Person Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="person_name"
                    value={formData.person_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Person Prefix *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="person_prefix"
                    value={formData.person_prefix}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-3">
                  <label>Profession *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {/* Common Fields */}
            <div className="col-md-3 mb-3">
              <label>Landline Code</label>
              <input
                type="text"
                className="form-control"
                name="landline_code"
                value={formData.landline_code}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>Landline Number</label>
              <input
                type="text"
                className="form-control"
                name="landline_number"
                value={formData.landline_number}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Door No</label>
              <input
                type="text"
                className="form-control"
                name="door_no"
                value={formData.door_no}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Street Name</label>
              <input
                type="text"
                className="form-control"
                name="street_name"
                value={formData.street_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Area</label>
              <input
                type="text"
                className="form-control"
                name="area"
                value={formData.area}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2 mb-3">
              <label>Pincode</label>
              <input
                type="text"
                className="form-control"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Promo Code</label>
              <input
                type="text"
                className="form-control"
                name="promo_code"
                value={formData.promo_code}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-center">
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

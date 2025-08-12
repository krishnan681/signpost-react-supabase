// import { useState, useEffect } from "react";

// import { supabase } from "../services/supabaseClient";
// import "../Css/AddPeople.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AddPeople = () => {
//   const [profileType, setProfileType] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [mobileExists, setMobileExists] = useState(false);

//   useEffect(() => {
//     const checkMobile = async () => {
//       if (formData.mobile_number?.length === 10) {
//         const { data: existingUser } = await supabase
//           .from("profiles")
//           .select("id")
//           .eq("mobile_number", formData.mobile_number)
//           .single();

//         setMobileExists(!!existingUser);
//       } else {
//         setMobileExists(false);
//       }
//     };

//     checkMobile();
//   }, [formData.mobile_number]);

//   const getInitialState = (type) => {
//     return type === "business"
//       ? {
//           profile_type: "business",
//           mobile_number: "",
//           business_name: "",
//           owner_name: "",
//           owner_prefix: "",
//           keywords: [],
//           description: "",
//           landline_code: "",
//           landline_number: "",
//           door_no: "",
//           street_name: "",
//           area: "",
//           city: "",
//           pincode: "",
//           email: "",
//           promo_code: "",
//           business_prefix: "M/s.", // ✅ Add this
//           business_mode: "",
//         }
//       : {
//           profile_type: "person",
//           mobile_number: "",
//           person_name: "",
//           person_prefix: "",
//           profession: "",
//           landline_code: "",
//           landline_number: "",
//           door_no: "",
//           street_name: "",
//           area: "",
//           city: "",
//           pincode: "",
//           email: "",
//           promo_code: "",
//         };
//   };

//   const handleTypeSelection = (type) => {
//     setProfileType(type);
//     setFormData(getInitialState(type));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "keywords") {
//       setFormData({
//         ...formData,
//         [name]: value.split(",").map((kw) => kw.trim()),
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const validateForm = () => {
//     const requiredFields = [
//       "mobile_number",
//       "business_name",
//       "keywords",
//       "door_no",
//       "street_name",
//       "area",
//       "city",
//       "pincode",
//       "business_mode", // ➕ Add this
//     ];

//     for (let field of requiredFields) {
//       if (
//         !formData[field] ||
//         (Array.isArray(formData[field]) && formData[field].length === 0)
//       ) {
//         alert(`${field.replace(/_/g, " ")} is required.`);
//         return false;
//       }
//     }

//     const mobilePattern = /^[6-9]\d{9}$/;
//     if (!mobilePattern.test(formData.mobile_number)) {
//       alert("Invalid mobile number (must start with 6-9 and be 10 digits)");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     // Optional: get user ID if you're using Supabase Auth
//     const user_id = null; // or session?.user?.id;

//     const cleanedData = Object.fromEntries(
//       Object.entries({
//         ...formData,
//         user_id,
//       }).map(([key, value]) => [key, value === "" ? null : value])
//     );

//     // ✅ Check for existing mobile number
//     const { data: existingUser, error: checkError } = await supabase
//       .from("profiles")
//       .select("id")
//       .eq("mobile_number", cleanedData.mobile_number)
//       .single();

//     if (mobileExists) {
//       alert("Mobile number is already registered.");
//       return;
//     }

//     const { data, error } = await supabase
//       .from("profiles")
//       .insert([cleanedData]);

//     if (error) {
//       console.error("Supabase Error:", error);
//       alert("Error submitting form");
//     } else {
//       alert("Form submitted successfully!");
//       setFormData(getInitialState(profileType));
//     }
//   };

//   if (!profileType) {
//     return (
//       <div className="WholeSection  d-flex align-items-center justify-content-center">
//         <div className="card p-4 shadow" style={{ width: "90%" }}>
//           <h2 className="text-center" style={{ fontWeight: "bold" }}>
//             MEDIA PATNER
//           </h2>
//           <p className="text-center">By adding </p>
//           <h2 className="text-center fw-bold">Choose account type</h2>

//           <div className="row mt-4">
//             <div className="col-md-6 mb-3">
//               <div className="border rounded text-center p-4 h-100">
//                 {/* Person SVG */}
//                 <div className="mb-3">
//                   <svg
//                     width="48"
//                     height="48"
//                     viewBox="0 0 24 24"
//                     fill="#007bff"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 1.2c-3.2 0-9.6 1.6-9.6 4.8V21h19.2v-3c0-3.2-6.4-4.8-9.6-4.8z" />
//                   </svg>
//                 </div>
//                 <h5 className="fw-bold">Person</h5>
//                 <p>Looking for services? Create an account and explore.</p>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handleTypeSelection("person")}
//                 >
//                   Create a Person Account
//                 </button>
//               </div>
//             </div>

//             <div className="col-md-6 mb-3">
//               <div className="border rounded text-center p-4 h-100">
//                 {/* Business SVG */}
//                 <div className="mb-3">
//                   <svg
//                     width="48"
//                     height="48"
//                     viewBox="0 0 24 24"
//                     fill="#fbbd08"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm4 2h4v2h-4V8zm0 4h4v2h-4v-2z" />
//                   </svg>
//                 </div>
//                 <h5 className="fw-bold">Business</h5>
//                 <p>Promote your business and reach your audience.</p>
//                 <button
//                   className="btn btn-warning text-white"
//                   onClick={() => handleTypeSelection("business")}
//                 >
//                   Create a Business Account
//                 </button>
//               </div>
//             </div>
//           </div>

//           <p className="text-center mt-4 small">
//             By Adding and inviting people, You’ll be rewarded for every
//             successful member.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Render form after selection
//   return (
//     <div className="signup-container">
//       <div className="form-card">
//         {/* <div className="toggle-buttons mb-3 text-center">
//           <button
//             className={`btn btn-sm ${
//               profileType === "business" ? "btn-primary" : "btn-outline-primary"
//             }`}
//             onClick={() => handleTypeSelection("business")}
//           >
//             Business
//           </button>
//           <button
//             className={`btn btn-sm ms-2 ${
//               profileType === "person" ? "btn-primary" : "btn-outline-primary"
//             }`}
//             onClick={() => handleTypeSelection("person")}
//           >
//             Person
//           </button>
//         </div> */}

//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label>Mobile Number *</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="mobile_number"
//                 value={formData.mobile_number}
//                 onChange={handleChange}
//               />
//               {mobileExists && (
//                 <small className="text-danger">
//                   Mobile number is already registered.
//                 </small>
//               )}
//             </div>

//             {profileType === "business" ? (
//               <>
//                 <div className="col-md-6 mb-3">
//                   <label>Business Name *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="business_name"
//                     value={formData.business_name}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 {/* ............... */}

//                 <div className="col-md-6 mb-3">
//                   <label>Business Mode *</label>
//                   <select
//                     className="form-control"
//                     name="business_mode"
//                     value={formData.business_mode}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select a mode</option>
//                     <option value="Manufacturer">Manufacturer</option>
//                     <option value="Dealer">Dealer</option>
//                     <option value="Distributor">Distributor</option>
//                     <option value="Whole Saler">Whole Saler</option>
//                     <option value="Retailer">Retailer</option>
//                     <option value="Exporter">Exporter</option>
//                     <option value="Importer">Importer</option>
//                     <option value="Consultant">Consultant</option>
//                     <option value="Service Firm">Service Firm</option>
//                   </select>
//                 </div>

//                 {/* ............... */}

//                 <div className="col-md-6 mb-3">
//                   <label>Owner Name *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="owner_name"
//                     value={formData.owner_name}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <label className="d-block mb-2">Owner Prefix *</label>
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="owner_prefix"
//                       value="Mr."
//                       checked={formData.owner_prefix === "Mr."}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label">Mr.</label>
//                   </div>
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="owner_prefix"
//                       value="Ms."
//                       checked={formData.owner_prefix === "Ms."}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label">Ms.</label>
//                   </div>
//                 </div>

//                 <div className="col-12 mb-3">
//                   <label>Keywords (comma separated)</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="keywords"
//                     value={formData.keywords.join(", ")}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-12 mb-3">
//                   <label>Description</label>
//                   <textarea
//                     className="form-control"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="col-md-6 mb-3">
//                   <label>Person Name *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="person_name"
//                     value={formData.person_name}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <label>Person Prefix *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="person_prefix"
//                     value={formData.person_prefix}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-12 mb-3">
//                   <label>Profession *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="profession"
//                     value={formData.profession}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </>
//             )}

//             {/* Common Fields */}
//             <div className="col-md-3 mb-3">
//               <label>Landline Code</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="landline_code"
//                 value={formData.landline_code}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-3 mb-3">
//               <label>Landline Number</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="landline_number"
//                 value={formData.landline_number}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Door No</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="door_no"
//                 value={formData.door_no}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Street Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="street_name"
//                 value={formData.street_name}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Area</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="area"
//                 value={formData.area}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4 mb-3">
//               <label>City</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-2 mb-3">
//               <label>Pincode</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-6 mb-3">
//               <label>Promo Code</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="promo_code"
//                 value={formData.promo_code}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="text-center">
//             <button className="btn btn-success" type="submit">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPeople;



import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { SupabaseClient } from "@supabase/supabase-js";
import "../Css/AddPeople.css"
import "bootstrap/dist/css/bootstrap.min.css";

const AddPeople = () => {
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
          business_prefix: "M/s.",
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
    if (profileType === "business") {
      const requiredFields = [
        "mobile_number",
        "business_name",
        "owner_name",
        "owner_prefix",
        "keywords",
        "door_no",
        "street_name",
        "area",
        "city",
        "pincode",
      ];

      for (let field of requiredFields) {
        if (
          !formData[field] ||
          (Array.isArray(formData[field]) && formData[field].length === 0)
        ) {
          Swal.fire({
            icon: "warning",
            title: "Validation Error",
            text: `${field.replace(/_/g, " ")} is required.`,
          });
          return false;
        }
      }
    } else if (profileType === "person") {
      const requiredFields = [
        "mobile_number",
        "person_name",
        "person_prefix",
        "profession",
        "door_no",
        "street_name",
        "area",
        "city",
        "pincode",
      ];

      for (let field of requiredFields) {
        if (
          !formData[field] ||
          (Array.isArray(formData[field]) && formData[field].length === 0)
        ) {
          Swal.fire({
            icon: "warning",
            title: "Validation Error",
            text: `${field.replace(/_/g, " ")} is required.`,
          });
          return false;
        }
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please select a profile type.",
      });
      return false;
    }

    const mobilePattern = /^[6-9]\d{9}$/;
    if (!mobilePattern.test(formData.mobile_number)) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Invalid mobile number (must start with 6-9 and be 10 digits)",
      });
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

    const { data: existingUser, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("mobile_number", cleanedData.mobile_number)
      .single();

    if (existingUser) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Mobile number is already registered.",
      });
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert([cleanedData]);

    if (error) {
      console.error("Supabase Error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "Error submitting form. Please try again later.",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Form submitted successfully!",
      });
      setFormData(getInitialState(profileType));
      setProfileType(null); // reset profile type after successful submit
    }
  };

  if (!profileType) {
    return (
      <div className="WholeSection  d-flex align-items-center justify-content-center">
        <div className="card p-4 shadow" style={{ width: "90%" }}>
          <h2 className="text-center fw-bold">MEDIA PATNER</h2>
          <p className="text-center">By adding</p>
          <h2 className="text-center fw-bold">Choose account type</h2>

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
            By Adding and inviting people, You’ll be rewarded for every
           successful member.
          </p>
        </div>
      </div>
    );
  }

  // Render form after selection
  return (
    <div className="signup-container">
      <div className="form-card">
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
                  <label>Keywords (comma separated) *</label>
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
                  <label className="d-block mb-2">Person Prefix *</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="person_prefix"
                      value="Mr."
                      checked={formData.person_prefix === "Mr."}
                      onChange={handleChange}
                      id="personPrefixMr"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="personPrefixMr"
                    >
                      Mr.
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="person_prefix"
                      value="Ms."
                      checked={formData.person_prefix === "Ms."}
                      onChange={handleChange}
                      id="personPrefixMs"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="personPrefixMs"
                    >
                      Ms.
                    </label>
                  </div>
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
              <label>Door No *</label>
              <input
                type="text"
                className="form-control"
                name="door_no"
                value={formData.door_no}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Street Name *</label>
              <input
                type="text"
                className="form-control"
                name="street_name"
                value={formData.street_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Area *</label>
              <input
                type="text"
                className="form-control"
                name="area"
                value={formData.area}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>City *</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2 mb-3">
              <label>Pincode *</label>
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
            <button
              className="btn btn-success"
              type="submit"
              disabled={mobileExists}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPeople;


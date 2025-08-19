// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "../Css/Navbar.css";
// import Swal from "sweetalert2";

// const Navbar = () => {
//   const { userData, logout } = useAuth();

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you really want to log out?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, logout",
//       cancelButtonText: "Cancel",
//       reverseButtons: true,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         Swal.fire(
//           "Logged out",
//           "You have been logged out successfully.",
//           "success"
//         );
//         navigate("/login");
//       }
//     });
//   };

//   return (
//     <nav className="glass-navbar navbar navbar-expand-lg navbar-light bg-transparent px-3 py-2">
//   <div className="container-fluid">
//     <Link className="navbar-brand fw-bold text-dark" to="/LandingPage">
//       📘 PhonebookApp
//     </Link>

//     <button
//       className="navbar-toggler"
//       type="button"
//       data-bs-toggle="collapse"
//       data-bs-target="#navbarNav"
//       aria-controls="navbarNav"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//     >
//       <span className="navbar-toggler-icon" />
//     </button>

//     <div className="collapse navbar-collapse" id="navbarNav">
//       <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
//         <li className="nav-item">
//           <Link className="nav-link text-dark" to="/">
//             Home
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link text-dark" to="/AboutPage">
//             About
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link text-dark" to="/contact">
//             Contact
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="btn btn-warning w-100 my-2" to="/PostYourListing">
//             Post your listing
//           </Link>
//         </li>
//         {userData ? (
//           <>
//             <li className="nav-item">
//               <Link
//                 to="/ProfilePage"
//                 className="nav-link fw-bold text-dark"
//               >
//                 👤 {userData.person_name || userData.business_name}
//               </Link>
//             </li>
//             <li className="nav-item">
//               <button className="btn btn-danger w-100 my-2" onClick={handleLogout}>
//                 Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li className="nav-item">
//               <Link className="btn btn-primary w-100 my-2" to="/login">
//                 Login
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="btn btn-success w-100 mb-2" to="/signup">
//                 Sign Up
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </div>
//   </div>
// </nav>

//   );
// };

// export default Navbar;

// import Swal from "sweetalert2";
// import { useAuth } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { userData, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you really want to log out?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, logout",
//       cancelButtonText: "Cancel",
//       reverseButtons: true,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         Swal.fire("Logged out", "You have been logged out successfully.", "success");
//         navigate("/login");
//       }
//     });
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       {/* ...your navbar content here... */}
//       <div className="d-flex">
//         {userData ? (
//           <>
//             <span className="me-3 fw-bold text-dark">
//               👤 {userData.person_name || userData.business_name}
//             </span>
//             <button className="btn btn-danger" onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link className="btn btn-primary me-2" to="/login">Login</Link>
//             <Link className="btn btn-success" to="/signup">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// .................
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Css/Navbar.css";
import Swal from "sweetalert2";
import { useEffect } from "react";

const Navbar = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ Close offcanvas manually (works with React Router)
  const closeOffcanvas = () => {
    const offcanvasEl = document.querySelector(".offcanvas.show");
    if (offcanvasEl && window.bootstrap) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  };

  const handleLogout = () => {
    closeOffcanvas();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire("Logged out", "You have been logged out successfully.", "success");
        navigate("/login");
      }
    });
  };

  // ✅ AddPeople handler
  const handleAddPeople = () => {
    closeOffcanvas();
    if (userData) {
      navigate("/AddPeople");
    } else {
      Swal.fire({
        title: "Login Required",
        text: "Please login to use this feature.",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  // ✅ FindNumber handler (NEW FEATURE)
  const handleFindNumber = () => {
    closeOffcanvas();
    if (userData) {
      navigate("/FindNumber");
    } else {
      Swal.fire({
        title: "Login Required",
        text: "Please login to find numbers.",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    if (
      typeof window.bootstrap === "undefined" &&
      typeof bootstrap !== "undefined"
    ) {
      window.bootstrap = bootstrap;
    }
  }, []);

  return (
    <nav className="container navbar navbar-light glass-navbar fixed-top px-3 py-2">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-dark" to="/LandingPage">
          📘 PhonebookApp
        </Link>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas (mobile) menu */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              📘 PhonebookApp
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body d-flex flex-column justify-content-between">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/" onClick={closeOffcanvas}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/AboutPage" onClick={closeOffcanvas}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/ContactPage" onClick={closeOffcanvas}>
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-dark" onClick={handleAddPeople}>
                  ➕ Add People
                </button>
              </li>

              {/* ✅ NEW FEATURE: Find Number */}
              <li className="nav-item">
                <button className="continue-application" onClick={handleFindNumber}>
                  <div>
                    <div className="pencil"></div>
                    <div className="folder">
                      <div className="top">
                        <svg viewBox="0 0 24 27">
                          <path d="M1,0 L23,0 C23.55,0 24,0.45 24,1 L24,8.17 C24,8.7 23.79,9.21 23.41,9.58 L20.58,12.41 C20.21,12.79 20,13.29 20,13.82 L20,26 C20,26.55 19.55,27 19,27 L1,27 C0.45,27 0,26.55 0,26 L0,1 C0,0.45 0.45,0 1,0 Z"></path>
                        </svg>
                      </div>
                      <div className="paper"></div>
                    </div>
                  </div>
                  Find Number
                </button>
              </li>

              <li className="nav-item my-2">
                <Link
                  className="btn btn-warning w-100"
                  to="/PostYourListing"
                  onClick={closeOffcanvas}
                >
                  Post your listing
                </Link>
              </li>

              {userData ? (
                <>
                  <li className="nav-item my-2">
                    <Link
                      className="btn btn-outline-secondary w-100"
                      to="/ProfilePage"
                      onClick={closeOffcanvas}
                    >
                      👤 {userData.person_name || userData.business_name}
                    </Link>
                  </li>
                  <li className="nav-item my-2">
                    <button className="btn btn-danger w-100" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item my-2">
                    <Link className="btn btn-primary w-100" to="/login" onClick={closeOffcanvas}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item my-2">
                    <Link className="btn btn-success w-100" to="/signup" onClick={closeOffcanvas}>
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Desktop navbar */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          <Link className="nav-link text-dark" to="/">
            Home
          </Link>
          <Link className="nav-link text-dark" to="/AboutPage">
            About
          </Link>
          <Link className="nav-link text-dark" to="/ContactPage">
            Contact
          </Link>
          <button className="nav-link btn btn-link text-dark" onClick={handleAddPeople}>
            ➕ Add People
          </button>

          {/* ✅ Desktop "Find Number" */}
          <button className="continue-application" onClick={handleFindNumber}>
            <div>
              <div className="pencil"></div>
              <div className="folder">
                <div className="top">
                  <svg viewBox="0 0 24 27">
                    <path d="M1,0 L23,0 C23.55,0 24,0.45 24,1 L24,8.17 C24,8.7 23.79,9.21 23.41,9.58 L20.58,12.41 C20.21,12.79 20,13.29 20,13.82 L20,26 C20,26.55 19.55,27 19,27 L1,27 C0.45,27 0,26.55 0,26 L0,1 C0,0.45 0.45,0 1,0 Z"></path>
                  </svg>
                </div>
                <div className="paper"></div>
              </div>
            </div>
            Find Number
          </button>

          <Link className="btn btn-warning" to="/PostYourListing">
            Post your listing
          </Link>

          {userData ? (
            <>
              <Link to="/ProfilePage" className="fw-bold text-dark text-decoration-none">
                👤 {userData.person_name || userData.business_name}
              </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
              <Link className="btn btn-success" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

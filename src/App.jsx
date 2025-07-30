// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import DirectoryPage from './pages/DirectoryPage';
// import Login from './pages/Auth/Login';
// import Signup from './pages/Auth/Signup';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<DirectoryPage />} /> */}
//         <Route path="/" element={<Login />} />
//         <Route path="/" element={<Signup />} />

//       </Routes>
//     </Router>
//   );
// };

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Auth/Login";
// import Signup from "./pages/Auth/Signup";
// import DirectoryPage from "./pages/DirectoryPage";
// import "bootstrap/dist/css/bootstrap.min.css";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <div style={{ paddingTop: "80px" }}>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/LandingPage" element={<LandingPage />} />
//           <Route path="/directory" element={<DirectoryPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Auth/Login";
// import Signup from "./pages/Auth/Signup";
// import DirectoryPage from "./pages/DirectoryPage";
// import "bootstrap/dist/css/bootstrap.min.css";
// import PostYourListing from "./Pages/PostYourListing";
// import AboutPage from "./Pages/AboutPage";
// import Timeline from "./Components/Timeline";
// import ProfilePage from "./Pages/ProfilePage";

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <div style={{ paddingTop: "80px" }}>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/LandingPage" element={<LandingPage />} />
//           <Route path="/directory" element={<DirectoryPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/PostYourListing" element={<PostYourListing />} />
//           <Route path="/AboutPage" element={<AboutPage />} />
//           <Route path="/Timeline" element={<Timeline />} />
//           <Route path="/ProfilePage" element={<ProfilePage />} />
//         </Routes>
//       </div>
//     </>
//   );
// };

// export default App;


import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import FooterPage from "./Components/FooterPage";
import LandingPage from "./Pages/LandingPage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import DirectoryPage from "./pages/DirectoryPage";
import "bootstrap/dist/css/bootstrap.min.css";
import PostYourListing from "./Pages/PostYourListing";
import AboutPage from "./Pages/AboutPage";
import Timeline from "./Components/Timeline";
import ProfilePage from "./Pages/ProfilePage";
import RecentlyListEnquiryModal from "./Components/RecentlyListEnquiryModal";
import CategoryForLandingPage from "./Components/CategoryForLandingPage";

const App = () => {
  const location = useLocation();

 
  const hideFooterPaths = ["/directory"];

  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/PostYourListing" element={<PostYourListing />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/Timeline" element={<Timeline />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/RecentlyListEnquiryModal" element={<RecentlyListEnquiryModal />} />
          <Route path="/CategoryForLandingPage" element={<CategoryForLandingPage />} />
        </Routes>
      </div>
      {shouldShowFooter && <FooterPage />}
    </>
  );
};

export default App;

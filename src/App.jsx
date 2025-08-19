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
  import { useLocation } from "react-router-dom";

  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Navbar from "./Components/Navbar";
  import FooterPage from "./Components/FooterPage";
  import LandingPage from "./Pages/LandingPage";
  import Login from "./pages/Auth/Login";
  import Signup from "./Pages/Auth/Signup";
  import DirectoryPage from "./Pages/DirectoryPage";
  import "bootstrap/dist/css/bootstrap.min.css";
  import PostYourListing from "./Pages/PostYourListing";
  import AboutPage from "./Pages/AboutPage";
  import Timeline from "./Components/Timeline";
  import ProfilePage from "./Pages/ProfilePage";
  import RecentlyListEnquiryModal from "./Components/RecentlyListEnquiryModal";
  import CategoryForLandingPage from "./Components/CategoryForLandingPage";
  import ContactPage from "../src/Pages/ContactPage";
  import AddPeople from "../src/Pages/AddPeople";
  import Dashboard from "./Components/Dashboard";
  import EditProfile from "./Components/EditProfile";
  import DirectoryIdDetails from "./Pages/DirectoryIdDetails";
  import PopularSearches from "./Components/PopularSearches";
  import FindNumber from "./Pages/FindNumber";
  import FeatureLists from "./Components/FeatureLists";
  import LandingPageDataBase from "./Components/LandingPageDataBase";
  import { FavoritesProvider } from "./context/FavoritesContext";
  import Favourites from "./Components/Favourites";

  const App = () => {
    const location = useLocation();

  
    const hideFooterPaths = ["/directorypage"];

    const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

    return (
      <FavoritesProvider>
      <>
        <Navbar />
        <div style={{ paddingTop: "80px" }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/LandingPage" element={<LandingPage />} />
            <Route path="/directoryPage" element={<DirectoryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/PostYourListing" element={<PostYourListing />} />
            <Route path="/AboutPage" element={<AboutPage />} />
            <Route path="/Timeline" element={<Timeline />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/RecentlyListEnquiryModal" element={<RecentlyListEnquiryModal />} />
            <Route path="/CategoryForLandingPage" element={<CategoryForLandingPage />} />
            <Route path="/ContactPage" element={<ContactPage />} />
            <Route path="/AddPeople" element={<AddPeople />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/profile/:id" element={<DirectoryIdDetails />} />  
            {/* <Route path="/PopularSearches" element={<PopularSearches />} />   */}
            <Route path="/FeatureLists" element={<FeatureLists />} />  
            <Route path="/LandingPageDataBase" element={<LandingPageDataBase />} />  
            <Route path="/FindNumber" element={<FindNumber />} />  
              <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </div>
        {shouldShowFooter && <FooterPage />}
      </>
      </FavoritesProvider>
    );
  };

  export default App;

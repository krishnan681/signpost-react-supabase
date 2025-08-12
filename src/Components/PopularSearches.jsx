// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "../Css/PopularSearches.css"

// import { Navigation, Pagination } from "swiper";

// const popularItems = [
//   {
//     title: "Estate Agents For Residential Rental",
//     imgSrc: "/images/estate-agent.jpg",
//   },
//   {
//     title: "Interior Designers",
//     imgSrc: "/images/interior-designer.jpg",
//   },
//   {
//     title: "Real Estate Agents",
//     imgSrc: "/images/real-estate.jpg",
//   },
//   {
//     title: "Banquet Halls",
//     imgSrc: "/images/banquet-hall.jpg",
//   },
//   {
//     title: "Caterers",
//     imgSrc: "/images/caterers.jpg",
//   },
// ];

// const PopularSearches = () => {
//   return (
//     <div className="popular-searches-container">
//       <h2 className="section-title">Popular Searches</h2>

//       <Swiper
//         modules={[Navigation, Pagination]}
//         spaceBetween={20}
//         navigation
//         pagination={{ clickable: true }}
//         loop={true}
//         breakpoints={{
//           600: {
//             slidesPerView: 1,
//           },
//           900: {
//             slidesPerView: 2,
//           },
//           1200: {
//             slidesPerView: 3,
//           },
//           1300: {
//             slidesPerView: 4,
//           },
//         }}
//         slidesPerView={4} // default to 4 on large screens
//       >
//         {popularItems.map((item, idx) => (
//           <SwiperSlide key={idx}>
//             <div className="card-container">
//               <div className="card">
//                 <img
//                   src={item.imgSrc}
//                   alt={item.title}
//                   className="card-image"
//                   loading="lazy"
//                 />
//                 <div className="card-content">
//                   <h3 className="card-title">{item.title}</h3>
//                   <button className="enquire-btn">Enquire Now</button>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default PopularSearches;

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "../Css/PopularSearches.css";

// import { Navigation, Pagination, Autoplay } from "swiper";

// const popularItems = [
//   {
//     title: "Estate Agents For Residential Rental",
//     imgSrc: "/images/estate-agent.jpg",
//   },
//   {
//     title: "Interior Designers",
//     imgSrc: "/images/interior-designer.jpg",
//   },
//   {
//     title: "Real Estate Agents",
//     imgSrc: "/images/real-estate.jpg",
//   },
//   {
//     title: "Banquet Halls",
//     imgSrc: "/images/banquet-hall.jpg",
//   },
//   {
//     title: "Caterers",
//     imgSrc: "/images/caterers.jpg",
//   },
// ];

// const PopularSearches = () => {
//   return (
//     <div className="popular-searches-container">
//       <h2 className="section-title">Popular Searches</h2>

//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={20}
//         navigation
//         pagination={{ clickable: true }}
//         loop={true}
//         autoplay={{
//           delay: 3000, // Slide every 3 seconds
//           disableOnInteraction: false, // Keep autoplay running after user interaction
//         }}
//         breakpoints={{
//           600: {
//             slidesPerView: 1,
//           },
//           900: {
//             slidesPerView: 2,
//           },
//           1200: {
//             slidesPerView: 3,
//           },
//           1300: {
//             slidesPerView: 4,
//           },
//         }}
//         slidesPerView={4} // default on large screens
//       >
//         {popularItems.map((item, idx) => (
//           <SwiperSlide key={idx}>
//             <div className="card-container">
//               <div className="card">
//                 <img
//                   src={item.imgSrc}
//                   alt={item.title}
//                   className="card-image"
//                   loading="lazy"
//                 />
//                 <div className="card-content">
//                   <h3 className="card-title">{item.title}</h3>
//                   <button className="enquire-btn">Enquire Now</button>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default PopularSearches;


import React from "react";
import Slider from "react-slick";
import "../Css/PopularSearches.css";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const popularItems = [
  {
    title: "Residential Rental",
    imgSrc: "/images/estate-agent.jpg",
  },
  {
    title: "Interior Designers",
    imgSrc: "/images/interior-designer.jpg",
  },
  {
    title: "Real Estate Agents",
    imgSrc: "/images/real-estate.jpg",
  },
  {
    title: "Banquet Halls",
    imgSrc: "/images/banquet-hall.jpg",
  },
  {
    title: "Caterers",
    imgSrc: "/images/caterers.jpg",
  },
];


const PopularSearches = () => {
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    { breakpoint: 1400, settings: { slidesToShow: 4 } },
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } }, // mobile landscape
    { breakpoint: 400, settings: { slidesToShow: 1 } }  // mobile portrait
  ],
};



  return (
    <div className="popular-searches-container">
      <h2 className="section-title">Popular Searches</h2>
      <Slider {...settings}>
        {popularItems.map((item, idx) => (
          <div key={idx} className="card-container">
            <div className="card">
              <img src={item.imgSrc} alt={item.title} className="card-image" loading="lazy" />
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <button className="enquire-btn">View All</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularSearches;

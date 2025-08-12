// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "../Css/Timeline.css"

// const timelineData = [
//   {
//     year: "1996",
//     image: "/path-to/tradeindia-logo.png", // Replace with actual image path
//     text: "Launched",
//   },
//   {
//     year: "2001",
//     text: "Formation of B2B portal and launch of template based catalogue",
//   },
//   {
//     year: "2002",
//     text: "Trade leads section launched & started coming out with CDroms",
//   },
//   {
//     year: "2003",
//     text: "CRM and MY TradeIndia operations started out with CDroms",
//   },
// ];

// const Timeline = () => {
//   useEffect(() => {
//     AOS.init({ once: true });
//   }, []);

//   return (
//     <div className="timeline-container py-5">
//       <h2 className="text-center mb-5 text-danger fw-bold">Our Journey</h2>
//       <div className="timeline-wrapper container">
//         <div className="d-none d-md-flex justify-content-between timeline-horizontal">
//           {timelineData.map((item, idx) => (
//             <div key={idx} className="timeline-item text-center" data-aos="fade-up">
//               <div className="timeline-dot" />
//               <div className="timeline-year">{item.year}</div>
//               {item.image ? (
//                 <img src={item.image} alt="Logo" className="timeline-img mt-2" />
//               ) : (
//                 <p className="timeline-text">{item.text}</p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Mobile View - Vertical Timeline */}
//         <div className="d-md-none timeline-vertical">
//           {timelineData.map((item, idx) => (
//             <div key={idx} className="timeline-item-vertical" data-aos="fade-up">
//               <div className="timeline-dot" />
//               <div className="timeline-content">
//                 <div className="timeline-year">{item.year}</div>
//                 {item.image ? (
//                   <img src={item.image} alt="Logo" className="timeline-img mt-2" />
//                 ) : (
//                   <p className="timeline-text">{item.text}</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Timeline;

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Css/Timeline.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import TimelineLogo from "../assets/Images/TimelineLogo.png"


// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

const timelineData = [
  {
    year: "1981",
    image: TimelineLogo, 
    text: "Launched",
  },
  {
    year: "2001",
    text: "Formation of B2B portal and launch of template based catalogue",
  },
  {
    year: "2002",
    text: "Trade leads section launched & started coming out with CDroms",
  },
  {
    year: "2003",
    text: "CRM and MY TradeIndia operations started out with CDroms",
  },
  {
    year: "2005",
    text: "New milestone 1",
  },
  {
    year: "2008",
    text: "New milestone 2",
  },
  {
    year: "2010",
    text: "New milestone 3",
  },
  {
    year: "2015",
    text: "New milestone 4",
  },
  {
    year: "2008",
    text: "New milestone 2",
  },
  {
    year: "2010",
    text: "New milestone 3",
  },
   
];

const Timeline = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div className="timeline-container py-5">
      <h2 className="text-center mb-5 text-danger fw-bold">Our Journey</h2>
      <div className="timeline-wrapper container">
        {/* Horizontal View - Desktop */}
        <div className="d-none d-md-block timeline-horizontal-swiper-container">
          <Swiper
            // cssMode={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            mousewheel={true}
            keyboard={true}
            grabCursor={true}
            simulateTouch={true} 
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper horizontal-timeline-swiper"
            slidesPerView={5}  
            spaceBetween={30}  
            breakpoints={{
               
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              
              992: {
                slidesPerView: 4,  
                spaceBetween: 40,
              },
            }}
          >
            {timelineData.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="timeline-item text-center" data-aos="fade-up">
                  <div className="timeline-dot" />
                  <div className="timeline-year">{item.year}</div>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt="Logo"
                      className="timeline-img mt-2"
                    />
                  ) : (
                    <p className="timeline-text">{item.text}</p>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile View - Vertical Timeline */}
        <div className="d-md-none timeline-vertical-swiper-container">
          <Swiper
            direction="vertical"
            navigation={true}
            pagination={{ clickable: true }}
            mousewheel={true}
            keyboard={true}
            grabCursor={true}
            
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper vertical-timeline-swiper"
            slidesPerView={4}
            spaceBetween={20}
          >
            {timelineData.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="timeline-item-vertical" data-aos="fade-up">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="Logo"
                        className="timeline-img mt-2"
                      />
                    ) : (
                      <p className="timeline-text">{item.text}</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Timeline;

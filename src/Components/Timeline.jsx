import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Css/Timeline.css"

const timelineData = [
  {
    year: "1996",
    image: "/path-to/tradeindia-logo.png", // Replace with actual image path
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
    text: "CRM and MY TradeIndia operations started",
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
        <div className="d-none d-md-flex justify-content-between timeline-horizontal">
          {timelineData.map((item, idx) => (
            <div key={idx} className="timeline-item text-center" data-aos="fade-up">
              <div className="timeline-dot" />
              <div className="timeline-year">{item.year}</div>
              {item.image ? (
                <img src={item.image} alt="Logo" className="timeline-img mt-2" />
              ) : (
                <p className="timeline-text">{item.text}</p>
              )}
            </div>
          ))}
        </div>

        {/* Mobile View - Vertical Timeline */}
        <div className="d-md-none timeline-vertical">
          {timelineData.map((item, idx) => (
            <div key={idx} className="timeline-item-vertical" data-aos="fade-up">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                {item.image ? (
                  <img src={item.image} alt="Logo" className="timeline-img mt-2" />
                ) : (
                  <p className="timeline-text">{item.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

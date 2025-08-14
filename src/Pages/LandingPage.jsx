import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "../Css/LandingPage.css";
import { useAuth } from "../context/AuthContext";

//components
import RecentlyListEnquiryModal from "../Components/RecentlyListEnquiryModal";
import CategoryForLandingPage from "../Components/CategoryForLandingPage";
import PopularSearches from "../Components/PopularSearches";
import LandingPageDataBase from "../Components/LandingPageDataBase";

import FeatureLists from "../Components/FeatureLists";

//supabase
import { supabase } from "../services/supabaseClient";

//swiper..................
// CSS imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "aos/dist/aos.css";

// AOS init (typically inside useEffect)
import AOS from "aos";

// Swiper imports (only once!)
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

//animation for text changing...
import RotatingText from "../Components/RotatingText";

//animation for rotating text...
import CircularText from "../Components/CircularText";

//images...
import MachineryImg from "../assets/images/Machinery.webp";
import ElectricalImg from "../assets/images/Electrical.webp";
import CNCImg from "../assets/images/CNC.webp";
import MotorImg from "../assets/images/Motor.webp";
import WaterPumpImg from "../assets/images/WaterPump.webp";
import TextilesImg from "../assets/images/Textiles.webp";
import MobileOne from "../assets/Images/Mobile-about_app.png";
import MobileTwo from "../assets/Images/Mobile-about_app2.png";
import googlePlay from "../assets/Images/Google-Play-Emblema.png";
import yourPhoneMockup from "../assets/Images/PhoneMockup.png";

const LandingPage = () => {
  const [recentRecords, setRecentRecords] = useState([]);
  const [premiumRecords, setPremiumRecords] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  //checks for if the user is logged in
  const { userData } = useAuth();

  //for Recently Added list opening modal
  const [showModal, setShowModal] = useState(false);

  // Recently added list
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const handleEnquireClick = (business) => {
    setSelectedBusiness(business);
    setShowModal(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/directoryPage?query=${query}`);
    }
  };

  // aos+ Swiper....................
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // fetch data from supabase

  useEffect(() => {
    const fetchRecentData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (!error) {
        setRecentRecords(data);
      }
    };

    fetchRecentData();
  }, []);

  useEffect(() => {
    const fetchPremiumData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("is_premium", true)
        .order("created_at", { ascending: false })
        .limit(10);

      if (!error) {
        setPremiumRecords(data || []);
      }
    };

    fetchPremiumData();
  }, []);

  const productCategories = [
    { title: "Clothing", img: MachineryImg },
    { title: "Xerox", img: ElectricalImg },
    { title: "CNC", img: CNCImg },
    { title: "Thread Rolling", img: MotorImg },
    { title: "Pumps Sets", img: WaterPumpImg },
    { title: "Industrial Packing", img: TextilesImg },
    { title: "Industrial Packing", img: TextilesImg },
    { title: "Industrial Packing", img: TextilesImg },
  ];

  const industrialCategories = [
    {
      title: "Machinery",
      bg: "#e0f7fa",
      items: [
        {
          name: "Clothing",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Lathe",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Drilling",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Cutting",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
      ],
    },
    {
      title: "Electrical",
      bg: "#fce4ec",
      items: [
        {
          name: "Motors",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Wiring",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Batteries",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Panels",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
      ],
    },
    {
      title: "Hardware",
      bg: "#f9fbe7",
      items: [
        {
          name: "Bearings",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Pipes",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Fasteners",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
        {
          name: "Valves",
          img: "https://ieyqtujybxchrnvzplwy.supabase.co/storage/v1/object/public/industrial-icons/machinery/Machinery.jpeg",
        },
      ],
    },
  ];

  return (
    <>
      <div className="hero-section d-flex flex-column align-items-center justify-content-center text-white position-relative">
        <h2 className="hero-title fw-bold text-center">
          Find Anyone, Anywhere and Promote Your Business
        </h2>

        <p className="text-center fs-5">
          Discover your customers nearby, attract them with your offers &
          discounts.
        </p>

        <div className="d-flex align-items-center gap-2 fs-4 fw-bold mt-2">
          <span className="hero-static-text text-light">
            Search by category like
          </span>
          <div className="rotating-box px-3 py-1 rounded">
            <RotatingText
              texts={["Drilling", "MSME Services", "Pumps", "CNC Machines"]}
              mainClassName="text-white fw-bold"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.03}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
        </div>

        <Form onSubmit={handleSearch} className="search-box d-flex mt-3 w-50">
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => navigate(`/directoryPage`)}
            placeholder="Search Business Name or products"
            className="Searchbox rounded-0 flex-grow-1"
          />

          <Button type="submit" variant="warning" className="rounded-0">
            <FaSearch />
          </Button>
        </Form>

        {/* View All Button */}
        {/* <Button
          className="view-all-btn mt-3 fw-bold px-4 py-2"
          onClick={() => navigate("/directoryPage")}
        >
          View All
        </Button> */}
      </div>

      {/* Industrial Products Carousel Style Section */}

      <div className="container my-5 position-relative">
        <h2 className="text-center fw-bold" data-aos="fade-up">
          Search By Industrial Products
        </h2>
        <p
          className="text-center text-muted"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Explore manufacturers and businesses by your preferred category
        </p>

        <div className="px-3 py-4" data-aos="fade-up" data-aos-delay="200">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={5} // fallback
            loop={true}
            navigation={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              320: { slidesPerView: 3 },
              576: { slidesPerView: 4 },
              768: { slidesPerView: 5 },
              992: { slidesPerView: 6 },
              1200: { slidesPerView: 7 },
            }}
          >
            {productCategories.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="text-center"
                  onClick={() => navigate(`/directory?query=${item.title}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="mb-2 mx-auto"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <div className="fw-semibold text-dark small">
                    {item.title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Industrial Categories */}
      <div className="container ">
        <Row>
          {industrialCategories.map((category, i) => (
            <Col md={4} key={i} className="mb-2">
              <div
                className="p-3 rounded h-100"
                style={{ background: category.bg }}
              >
                <h5 className="fw-bold">{category.title}</h5>
                <div className="d-flex flex-wrap gap-3 mt-3 IndustrialCategories_Colored">
                  {category.items.map((item, j) => (
                    <div
                      className="text-center cursor-pointer"
                      onClick={() => navigate(`/directory?query=${item.name}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="rounded-circle mb-1"
                        width={40}
                        height={40}
                      />
                      <div style={{ fontSize: 14 }}>{item.name}</div>
                    </div>
                  ))}
                </div>
                <div className="text-end mt-2">
                  <a href="#" className="text-primary fw-bold">
                    View all
                  </a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <FeatureLists />
      <LandingPageDataBase />

      {/* Recently Added Lists */}
      <div className="section-container mb-5">
        <h3 className="fw-bold mb-3">Recently Added Lists</h3>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {recentRecords.map((business, i) => {
            const displayName =
              business.business_name?.trim() ||
              business.person_name?.trim() ||
              "No Name";

            const mobileMasked =
              business.mobile_number?.length === 10
                ? `${business.mobile_number.slice(0, 5)}xxxxx`
                : "N/A";

            return (
              <SwiperSlide key={i}>
                <div className="business-card border rounded px-3 py-3 h-100">
                  <h6 className="fw-bold">{displayName}</h6>
                  <p className="text-muted mb-1">
                    🛠️{" "}
                    {Array.isArray(business.keywords) &&
                    business.keywords.length > 0
                      ? business.keywords.slice(0, 3).join(", ")
                      : "No products"}
                  </p>
                  <p className="text-muted mb-2">📞 {mobileMasked}</p>
                  <p className="text-muted mb-1">📍 {business.city || "N/A"}</p>

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEnquireClick(business)}
                  >
                    Enquire Now
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <RecentlyListEnquiryModal
          show={showModal}
          onClose={() => setShowModal(false)}
          selectedBusiness={selectedBusiness}
        />
      </div>

      {/* Recently Added Premium Lists */}
      <div className="section-container mb-5">
        <h3 className="fw-bold mb-3">Recently Added Premium Lists</h3>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            992: { slidesPerView: 3 },
          }}
        >
          {premiumRecords.map((business, i) => {
            const displayName =
              business.business_name?.trim() ||
              business.person_name?.trim() ||
              "No Name";

            return (
              <SwiperSlide key={i}>
                <div
                  className="premium-card-with-bg position-relative text-white"
                  // style={{
                  //   backgroundImage: `url(${
                  //     business.profile_image
                  //   })`,
                  // }}
                >
                  {/* Gradient Overlay */}
                  <div className="premium-gradient-overlay"></div>

                  {/* Ribbon */}
                  <div className="premium-ribbon">
                    <span>PREMIUM</span>
                  </div>

                  {/* Card Content */}
                  <div className="premium-card-content p-3 d-flex flex-column justify-content-between h-100">
                    <div>
                      {/* Optional profile logo */}
                      {business.profile_image && (
                        <img
                          src={business.profile_image}
                          alt={displayName}
                          className="premium-profile-img mb-2"
                        />
                      )}

                      <h5 className="Premium-Name">{displayName}</h5>

                      <p className="fs-6 mb-4">
                        {business.city || business.address || "No location"}
                      </p>

                      {business.description && (
                        <p className="premium-description-text">
                          {business.description.length > 80
                            ? business.description.slice(0, 80) + "..."
                            : business.description}
                        </p>
                      )}
                    </div>

                    <button className="btn btn-warning btn-sm text-light fw-semibold align-self-start PremiumEnquireBtn">
                      Enquire Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* <PopularSearches/> */}

      {/* Testimonials Section */}
      <div className="section-container">
        <Row>
          <Col>
            <h3 className="text-center">Testimonials</h3>
            <div className="text-center">
              <p className="testimonial-quote">
                "Signpost PHONE BOOK has transformed the way we reach our
                customers!" - Business Owner
              </p>
              <p className="testimonial-quote">
                "The platform is user-friendly and effective for our marketing
                needs." - Marketing Manager
              </p>
            </div>
          </Col>
        </Row>
      </div>

      {/* phonebook - app download from google play */}

      <div className="container  phonebook-wrapper">
        <div className="promo-box">
          {/* <h2>Phonebook</h2> */}
          <h2>Take PhoneBook with you. It's free!</h2>
          <p>
            You can search millions of local businesses on the go.
            <br /> Everything you need is in one app. Download from Google Play
          </p>

          <div className="logo-review-container">
            <a
              href="https://play.google.com/store/apps/details?id=com.celfonphonebookapp&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={googlePlay}
                alt="Get it on Google Play"
                className="playstore-logo"
              />
            </a>

            <div className="review-stars">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFD700" // gold color
                  viewBox="0 0 24 24"
                  className="star"
                >
                  <path d="M12 .587l3.668 7.568L24 9.75l-6 5.848L19.335 24 12 20.018 4.665 24 6 15.598 0 9.75l8.332-1.595z" />
                </svg>
              ))}
            </div>
            <h4>10k Downloads</h4>
          </div>
        </div>

        <div className="phone-mockup-container">
          {/* Replace this div with an <img /> or SVG later */}
          <img src={MobileOne} alt="Phone mockup" className="mockup" />
        </div>
      </div>

      {/* categories for landingpage */}
      <CategoryForLandingPage />

      <section className="callback-section">
        <p className="callback-subtitle">TALK TO US TO LIST YOUR BUSINESS</p>
        <h2 className="callback-title">
          Still have queries! Request a call back Now!
        </h2>
        <a href="tel:95145 55132" className="callback-button">
          Call me back Now
        </a>
      </section>
    </>
  );
};

export default LandingPage;

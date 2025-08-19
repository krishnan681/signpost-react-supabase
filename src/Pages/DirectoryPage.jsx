// import { useEffect, useState } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";
// import { useAuth } from "../context/AuthContext";
// import Swal from "sweetalert2";
// import RecentlyListEnquiryModal from "../Components/RecentlyListEnquiryModal";
// import "../Css/DirectoryPage.css";

// const itemsPerPage = 5;

// const DirectoryPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { userData } = useAuth();

//   const queryParams = new URLSearchParams(location.search);
//   const query = queryParams.get("query")?.toLowerCase() || "";
//   const showAll = queryParams.get("showAll") === "true";

//   const [allRecords, setAllRecords] = useState([]);
//   const [filteredCategory, setFilteredCategory] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedProfile, setSelectedProfile] = useState(null);

//   const categories = ["All", "Machinery", "Electrical", "Hardware", "Automation", "Chemicals"];

//   const fetchDirectoryData = async () => {
//     const { data, error } = await supabase
//       .from("profiles")
//       .select("*")
//       .order("user_id", { ascending: false });

//     if (!error) setAllRecords(data);
//   };

//   useEffect(() => {
//     fetchDirectoryData();
//   }, []);

//   useEffect(() => {
//     if (!showAll && query) {
//       const match = categories.find((cat) =>
//         query.toLowerCase().includes(cat.toLowerCase())
//       );
//       if (match) setFilteredCategory(match);
//     }
//   }, [query, showAll]);

//   const highlightMatch = (text) => {
//     if (!text) return "";
//     if (!query) return text;
//     const parts = text.split(new RegExp(`(${query})`, "gi"));
//     return parts.map((part, index) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <mark key={index}>{part}</mark>
//       ) : (
//         part
//       )
//     );
//   };

//   const matchedRecords = showAll
//     ? allRecords
//     : allRecords.filter((item) => {
//         const searchValue = query.toLowerCase();
//         return (
//           item.business_name?.toLowerCase().includes(searchValue) ||
//           item.person_name?.toLowerCase().includes(searchValue) ||
//           `${item.prefix || ""} ${item.person_name || ""}`
//             .toLowerCase()
//             .includes(searchValue) ||
//           item.product?.toLowerCase().includes(searchValue)
//         );
//       });

//   const recommendedRecords = showAll
//     ? []
//     : allRecords.filter(
//         (item) =>
//           !item.business_name?.toLowerCase().includes(query) &&
//           !item.product?.toLowerCase().includes(query)
//       );

//   const categoryFiltered = matchedRecords.filter((item) =>
//     filteredCategory === "All"
//       ? true
//       : item.product?.toLowerCase().includes(filteredCategory.toLowerCase())
//   );

//   const totalPages = Math.ceil(categoryFiltered.length / itemsPerPage);
//   const paginated = categoryFiltered.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleCardClick = (e) => {
//     if (!userData) {
//       e.preventDefault();
//       Swal.fire({
//         icon: "info",
//         title: "Login Required",
//         text: "Please log in to view profiles.",
//       }).then(() => navigate("/login"));
//     }
//   };

//   const handleCall = (phone) => {
//     if (!phone) {
//       Swal.fire("No Phone Number", "This user has not provided a contact number.", "info");
//       return;
//     }
//     window.location.href = `tel:${phone}`;
//   };

//   const openEnquiryModal = (profile) => {
//     if (!userData) {
//       Swal.fire("Login Required", "Please log in to send an enquiry.", "info");
//       return;
//     }
//     setSelectedProfile(profile);
//     setShowModal(true);
//   };

//   const renderCard = (item) => (
//     <Link
//       to={`/profile/${item.user_id}`}
//       key={item.user_id}
//       className="text-decoration-none text-dark"
//       onClick={handleCardClick}
//     >
//       <div
//         className={`mb-4 shadow-sm directory-card ${
//           item.is_premium ? "bg-light-pink" : "non-premium-card"
//         }`}
//       >
//         <div className="card-premium">
//           <img
//             src={item.profile_image || "/placeholder-logo.png"}
//             alt={item.business_name}
//           />
//           <div className="card-info">
//             <h5>
//               {highlightMatch(
//                 item.business_name || `${item.prefix || ""} ${item.person_name || ""}`
//               )}
//             </h5>
//             <p>
//               <strong>Location:</strong> {item.city || "N/A"}
//             </p>
//             <p>
//               <strong>Description:</strong>{" "}
//               {item.description || "No description available"}
//             </p>

//             <p className="card-text text-muted small mb-0">
//               {item.profile_type === "business" ? (
//                 <>
//                   <strong>Products:</strong>{" "}
//                   {Array.isArray(item.keywords)
//                     ? item.keywords.join(", ")
//                     : item.keywords || "No products listed"}
//                 </>
//               ) : (
//                 <>
//                   <strong>Profession:</strong>{" "}
//                   {item.profession || "Not specified"}
//                 </>
//               )}
//             </p>
//           </div>
//           <div className="card-buttons">
//             <button className="btn btn-danger">View Full Profile</button>
//             <button
//               className="btn btn-warning"
//               type="button"
//               onClick={(e) => {
//                 e.preventDefault();
//                 openEnquiryModal(item);
//               }}
//             >
//               Enquire
//             </button>
//             <button
//               className="btn btn-success"
//               type="button"
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleCall(item.mobile_number);
//               }}
//             >
//               Call
//             </button>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );

//   return (
//     <div className="directory-container">
//       {/* Sidebar */}
//       <div className="directory-sidebar">
//         <h4>Filters</h4>
//         <div className="form-group mt-3">
//           <label htmlFor="categorySelect">Category</label>
//           <select
//             id="categorySelect"
//             className="form-control"
//             value={filteredCategory}
//             onChange={(e) => {
//               setFilteredCategory(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             {categories.map((cat, i) => (
//               <option key={i} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="directory-content">
//         {query && (
//           <>
//             <h5 className="mb-3">
//               Search Results for "<strong>{query}</strong>"
//             </h5>
//             {matchedRecords.length > 0 ? (
//               matchedRecords.map(renderCard)
//             ) : (
//               <div className="p-4">
//                 <p>No results found for "<strong>{query}</strong>"</p>
//               </div>
//             )}
//           </>
//         )}

//         {categoryFiltered.length > 0 && (
//           <>
//             <h5 className="mt-5 mb-3">Recommended</h5>
//             {paginated.map(renderCard)}

//             {/* Pagination */}
//             <div className="pagination-controls">
//               <button
//                 className="btn btn-sm btn-outline-secondary"
//                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 Prev
//               </button>
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 className="btn btn-sm btn-outline-secondary"
//                 onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Enquiry Modal */}
//       <RecentlyListEnquiryModal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         selectedBusiness={selectedProfile}
//       />
//     </div>
//   );
// };

// export default DirectoryPage;

import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import RecentlyListEnquiryModal from "../Components/RecentlyListEnquiryModal";
import "../Css/DirectoryPage.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import FavoriteModal from "../Components/FavoriteModal";

const itemsPerPage = 10;

const DirectoryPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userData } = useAuth();

    const [allRecords, setAllRecords] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const businessNameQuery =
        queryParams.get("business_name")?.toLowerCase() || "";
    const keywordsQuery = queryParams.get("keywords")?.toLowerCase() || "";
    const showAll = queryParams.get("showAll") === "true";

    const [searchBusinessName, setSearchBusinessName] =
        useState(businessNameQuery);
    const [searchKeywords, setSearchKeywords] = useState(keywordsQuery);

    const categories = [
        "All",
        "Machinery",
        "Electrical",
        "Hardware",
        "Automation",
        "Chemicals",
    ];

    const [showFavoriteModal, setShowFavoriteModal] = useState(false);
    const [selectedFavoriteItem, setSelectedFavoriteItem] = useState(null);

    const handleOpenFavoriteModal = (item) => {
        setSelectedFavoriteItem(item);
        setShowFavoriteModal(true);
    };

    const handleSaveFavorite = (option, item) => {
        // Here you can handle saving with category (option)
        addFavorite({ ...item, category: option });
        Swal.fire("Saved!", `${item.business_name || item.person_name} saved to ${option}`, "success");
    };

    const fetchDirectoryData = async () => {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) setAllRecords(data);
    };

    useEffect(() => {
        fetchDirectoryData();
    }, []);

    const { favorites, addFavorite, removeFavorite } = useFavorites();

    let matchedRecords = [];
    let recommendedRecords = [];

    const currentBusinessNameQuery = searchBusinessName.toLowerCase();
    const currentKeywordsQuery = searchKeywords.toLowerCase();

    if (showAll) {
        matchedRecords = allRecords;
        recommendedRecords = [];
    } else if (currentBusinessNameQuery || currentKeywordsQuery) {
        const searchTerm =
            (currentBusinessNameQuery + " " + currentKeywordsQuery).trim();

        matchedRecords = allRecords.filter((item) => {
            const searchableFields = [
                item.business_name,
                item.person_name,
                item.profession,
                item.description,
                item.products
                    ? Array.isArray(item.products)
                        ? item.products.join(", ")
                        : item.products
                    : "",
            ];

            return searchTerm
                .toLowerCase()
                .split(/\s+/)
                .every((term) =>
                    searchableFields.some(
                        (field) => field && field.toLowerCase().includes(term)
                    )
                );
        });

        recommendedRecords = allRecords.filter(
            (item) => !matchedRecords.includes(item)
        );
    } else {
        recommendedRecords = allRecords;
    }

    const showList = showAll
        ? matchedRecords
        : matchedRecords.length > 0
            ? matchedRecords
            : recommendedRecords;

    const categoryFiltered = (list) =>
        list.filter((item) =>
            filteredCategory === "All"
                ? true
                : (Array.isArray(item.products)
                    ? item.products.join(", ")
                    : item.products || ""
                )
                    .toLowerCase()
                    .includes(filteredCategory.toLowerCase())
        );

    const paginated = (list) => {
        const filtered = categoryFiltered(list);
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        return {
            data: filtered.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
            ),
            totalPages,
        };
    };

    const { data: paginatedData, totalPages } = paginated(showList);

    const highlightMatch = (text) => {
        if (!text) return "";

        let combinedQuery = (searchBusinessName + " " + searchKeywords).trim();
        if (!combinedQuery) return text;

        const escapedQuery = combinedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const terms = escapedQuery.split(/\s+/);
        const regex = new RegExp(`(${terms.join("|")})`, "gi");

        const parts = text.split(regex);

        return parts.map((part, index) =>
            terms.some((term) => term.toLowerCase() === part.toLowerCase()) ? (
                <mark key={index}>{part}</mark>
            ) : (
                part
            )
        );
    };

    const handleCardClick = (e) => {
        if (!userData) {
            e.preventDefault();
            Swal.fire({
                icon: "info",
                title: "Login Required",
                text: "Please log in to view profiles.",
            }).then(() => navigate("/login"));
        }
    };

    const handleCall = (phone) => {
        if (!phone) {
            Swal.fire(
                "No Phone Number",
                "This user has not provided a contact number.",
                "info"
            );
            return;
        }
        window.location.href = `tel:${phone}`;
    };

    const openEnquiryModal = (profile) => {
        if (!userData) {
            Swal.fire("Login Required", "Please log in to send an enquiry.", "info");
            return;
        }
        setSelectedProfile(profile);
        setShowModal(true);
    };

    const renderCard = (item) => {
        const isFavorite = favorites.some((fav) => fav.id === item.id);

        const toggleFavorite = (e) => {
            e.preventDefault();
            if (isFavorite) {
                removeFavorite(item.id);
            } else {
                addFavorite(item);
            }
        };

        return (
            <Link
                to={`/profile/${item.id}`}
                key={item.id}
                className="text-decoration-none text-dark"
                onClick={handleCardClick}
            >
                <div
                    className={`mb-4 shadow-sm directory-card ${item.is_prime ? "bg-light-pink" : "non-premium-card"
                        }`}
                >
                    <div className="card-premium">
                        <img
                            src={item.profile_image || "/placeholder-logo.png"}
                            alt={item.business_name || item.person_name}
                        />

                        <div className="card-info">
                            <h5>
                                {highlightMatch(
                                    item.business_name ||
                                    `${item.person_prefix || ""} ${item.person_name || ""}`
                                )}
                            </h5>
                            <p>
                                <strong>Location:</strong> {item.city || "N/A"}
                            </p>
                            <p>
                                <strong>Description:</strong>{" "}
                                {item.description || "No description available"}
                            </p>
                            <p className="card-text text-muted small mb-0">
                                {item.user_type === "business" ? (
                                    <>
                                        <strong>Products:</strong>{" "}
                                        {Array.isArray(item.keywords) && item.keywords.length > 0
                                            ? item.keywords.join(", ")
                                            : "No products listed"}
                                    </>
                                ) : (
                                    <>
                                        <strong>Profession:</strong>{" "}
                                        {item.profession || "Not specified"}
                                    </>
                                )}
                            </p>
                        </div>

                        <div className="card-buttons d-flex gap-2">
                            <button className="btn btn-danger">View Full Profile</button>
                            <button
                                className="btn btn-warning"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    openEnquiryModal(item);
                                }}
                            >
                                Enquire
                            </button>
                            <button
                                className="btn btn-success"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCall(item.mobile_number);
                                }}
                            >
                                Call
                            </button>

                            {/* Favorite Button */}
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOpenFavoriteModal(item);
                                }}
                            >
                                {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                            </button>

                        </div>
                    </div>
                </div>
            </Link>


        );
    };




    return (
        <div className="directory-container">
            <div className="directory-content">
                <div className="seaerch-boxxes mb-4 d-flex flex-column flex-md-row gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Business Name"
                        value={searchBusinessName}
                        onChange={(e) => setSearchBusinessName(e.target.value)}
                        style={{ minWidth: "200px" }}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Keywords"
                        value={searchKeywords}
                        onChange={(e) => setSearchKeywords(e.target.value)}
                        style={{ minWidth: "200px" }}
                    />
                </div>

                {showList.length > 0 ? (
                    paginatedData.map((item, index) => renderCard(item, index))
                ) : (
                    <div className="p-4">
                        <p>No results found for your search.</p>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="pagination-controls">
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>

                        <span>
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            <RecentlyListEnquiryModal
                show={showModal}
                onClose={() => setShowModal(false)}
                selectedBusiness={selectedProfile}
            />

            <FavoriteModal
                show={showFavoriteModal}
                onClose={() => setShowFavoriteModal(false)}
                onSave={handleSaveFavorite}
                selectedItem={selectedFavoriteItem}
            />
        </div>
    );
};

export default DirectoryPage;


// import { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";
// import "../Css/DirectoryPage.css";

// import banner1 from "../assets/Images/Electrical.webp";
// import banner2 from "../assets/Images/Electrical.webp";
// import banner3 from "../assets/Images/Electrical.webp";

// const itemsPerPage = 5;

// const DirectoryPage = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query")?.toLowerCase() || "";

//   const [searchTerm, setSearchTerm] = useState(initialQuery);
//   const [allRecords, setAllRecords] = useState([]);
//   const [filteredCategory, setFilteredCategory] = useState("All");
//   const [filteredProduct, setFilteredProduct] = useState("All");
//   const [alphabetFilter, setAlphabetFilter] = useState("");
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const categories = ["All", "Machinery", "Electrical", "Hardware", "Automation", "Chemicals"];
//   const trendingProducts = ["LED Bulbs", "Solar Panels", "CNC Machines", "Lubricants", "Wires & Cables"];
//   const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

//   useEffect(() => {
//     const fetchDirectoryData = async () => {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .order("user_id", { ascending: false });

//       if (!error) setAllRecords(data);
//       else console.error("Fetch Error:", error.message);
//     };
//     fetchDirectoryData();
//   }, []);

//   useEffect(() => {
//     if (searchTerm) {
//       const match = categories.find((cat) =>
//         searchTerm.includes(cat.toLowerCase())
//       );
//       if (match) setFilteredCategory(match);
//       setRecentSearches((prev) =>
//         [searchTerm, ...prev.filter((q) => q !== searchTerm)].slice(0, 5)
//       );
//     }
//   }, [searchTerm]);

//   const matchedRecords = allRecords.filter(
//     (item) =>
//       item.business_name?.toLowerCase().includes(searchTerm) ||
//       item.product?.toLowerCase().includes(searchTerm)
//   );

//   const recommendedRecords = allRecords.filter(
//     (item) =>
//       !item.business_name?.toLowerCase().includes(searchTerm) &&
//       !item.product?.toLowerCase().includes(searchTerm)
//   );

//   const categoryFiltered = recommendedRecords.filter((item) => {
//     const categoryMatch =
//       filteredCategory === "All" ||
//       item.product?.toLowerCase().includes(filteredCategory.toLowerCase());
//     const productMatch =
//       filteredProduct === "All" ||
//       item.product?.toLowerCase().includes(filteredProduct.toLowerCase());
//     const alphabetMatch =
//       !alphabetFilter || item.business_name?.toUpperCase().startsWith(alphabetFilter);

//     return categoryMatch && productMatch && alphabetMatch;
//   });

//   const totalPages = Math.ceil(categoryFiltered.length / itemsPerPage);
//   const paginated = categoryFiltered.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const renderCard = (item) => (
//     <div className="card mb-3 shadow-sm" key={item.user_id}>
//       <div className="row g-0">
//         <div className="col-md-2 d-flex align-items-center justify-content-center p-2">
//           <img
//             src={item.profile_image}
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "https://via.placeholder.com/100";
//             }}
//             alt="Profile"
//             className="img-fluid rounded"
//             style={{ maxHeight: "100px", objectFit: "cover" }}
//           />
//         </div>

//         <div className="col-md-7">
//           <div className="card-body">
//             <h5 className="card-title text-primary mb-1">
//               {item.business_name || `${item.prefix} ${item.person_name}`}
//             </h5>
//             <p className="mb-1 text-muted small">
//               <strong>Location:</strong> {item.city || "Not set"}
//             </p>
//             <p className="card-text text-muted small mb-2">
//               <strong>Description:</strong> {item.description}
//             </p>
//             <p className="card-text text-muted small mb-2">
//               <strong>Products:</strong>{" "}
//               {Array.isArray(item.keywords) ? item.keywords.join(", ") : item.keywords}
//             </p>
//           </div>
//         </div>

//         <div className="col-md-3 profile-actions">
//           <div className="top-button">
//             <Link to={`/profile/${item.user_id}`} className="btn btn-danger w-100">
//               <i className="bi bi-person-lines-fill me-2"></i> View Full Profile
//             </Link>
//           </div>
//           <div className="bottom-buttons">
//             <button className="btn btn-warning">
//               <i className="bi bi-envelope me-2"></i> Enquire
//             </button>
//             <a href={`tel:${item.mobile_number}`} className="btn btn-success">
//               <i className="bi bi-telephone me-2"></i> Call
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <div className="container mt-4">
//         <input
//           type="text"
//           className="form-control form-control-lg mb-4"
//           placeholder="Search products, businesses..."
//           value={searchTerm}
//           onChange={(e) => {
//             const newSearch = e.target.value.toLowerCase();
//             setSearchTerm(newSearch);
//             const params = new URLSearchParams(location.search);
//             params.set("query", newSearch);
//             window.history.replaceState(null, "", `?${params.toString()}`);
//           }}
//         />
//       </div>

//       <div className="carousel slide mb-4 container" data-bs-ride="carousel">
//         <div className="carousel-inner rounded shadow-sm">
//           <div className="carousel-item active" data-bs-interval="3000">
//             <img src={banner1} className="d-block w-100" alt="Promo 1" />
//           </div>
//           <div className="carousel-item" data-bs-interval="3000">
//             <img src={banner2} className="d-block w-100" alt="Promo 2" />
//           </div>
//           <div className="carousel-item" data-bs-interval="3000">
//             <img src={banner3} className="d-block w-100" alt="Promo 3" />
//           </div>
//         </div>
//         <button className="carousel-control-prev" type="button" data-bs-target="#promoCarousel" data-bs-slide="prev">
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         </button>
//         <button className="carousel-control-next" type="button" data-bs-target="#promoCarousel" data-bs-slide="next">
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         </button>
//       </div>

//       <div className="directory-container">
//         <div className="directory-sidebar">
//           <h4>Filters</h4>
//           <div className="form-group mt-3">
//             <label htmlFor="categorySelect">Category</label>
//             <select
//               id="categorySelect"
//               className="form-control"
//               value={filteredCategory}
//               onChange={(e) => {
//                 setFilteredCategory(e.target.value);
//                 setCurrentPage(1);
//               }}
//             >
//               {categories.map((cat, i) => (
//                 <option key={i} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group mt-3">
//             <label>Trending Products</label>
//             <ul className="list-group">
//               {trendingProducts.map((product, i) => (
//                 <li
//                   key={i}
//                   className="list-group-item list-group-item-action"
//                   onClick={() => setFilteredProduct(product)}
//                 >
//                   {product}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="form-group mt-3">
//             <label>Alphabetical</label>
//             <div className="d-flex flex-wrap gap-1">
//               {alphabet.map((char) => (
//                 <button
//                   key={char}
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={() => setAlphabetFilter(char)}
//                 >
//                   {char}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="form-group mt-3">
//             <label>Recent Searches</label>
//             <ul className="list-group">
//               {recentSearches.map((search, i) => (
//                 <li key={i} className="list-group-item">{search}</li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="directory-content">
//           {searchTerm && (
//             <>
//               <h5 className="mb-3">
//                 Search Results for "<strong>{searchTerm}</strong>"
//               </h5>
//               {matchedRecords.length > 0 ? (
//                 matchedRecords.map(renderCard)
//               ) : (
//                 <div className="p-4">
//                   <p>No results found for "<strong>{searchTerm}</strong>"</p>
//                 </div>
//               )}
//             </>
//           )}

//           {categoryFiltered.length > 0 && (
//             <>
//               <h5 className="mt-5 mb-3">Recommended</h5>
//               {paginated.map(renderCard)}

//               <div className="d-flex justify-content-between align-items-center mt-4">
//                 <button
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                   disabled={currentPage === 1}
//                 >
//                   Prev
//                 </button>
//                 <span>Page {currentPage} of {totalPages}</span>
//                 <button
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DirectoryPage;

// import { useEffect, useState } from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";
// import { useAuth } from "../context/AuthContext";
// import Swal from "sweetalert2";
// import "../Css/DirectoryPage.css";

// import banner1 from "../assets/Images/Electrical.webp";
// import banner2 from "../assets/Images/Electrical.webp";
// import banner3 from "../assets/Images/Electrical.webp";

// const itemsPerPage = 5;

// const DirectoryPage = () => {
//   const { userData } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query")?.toLowerCase() || "";

//   const [searchTerm, setSearchTerm] = useState(initialQuery);
//   const [allRecords, setAllRecords] = useState([]);
//   const [filteredCategory, setFilteredCategory] = useState("All");
//   const [filteredProduct, setFilteredProduct] = useState("All");
//   const [alphabetFilter, setAlphabetFilter] = useState("");
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const categories = [
//     "All",
//     "Machinery",
//     "Electrical",
//     "Hardware",
//     "Automation",
//     "Chemicals",
//   ];
//   const trendingProducts = [
//     "LED Bulbs",
//     "Solar Panels",
//     "CNC Machines",
//     "Lubricants",
//     "Wires & Cables",
//   ];

//   const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

//   useEffect(() => {
//     const fetchDirectoryData = async () => {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .order("user_id", { ascending: false });
//       if (!error) setAllRecords(data);
//       else console.error("Fetch Error:", error.message);
//     };
//     fetchDirectoryData();
//   }, []);

//   useEffect(() => {
//     if (searchTerm) {
//       const match = categories.find((cat) =>
//         searchTerm.includes(cat.toLowerCase())
//       );
//       if (match) setFilteredCategory(match);
//       setRecentSearches((prev) =>
//         [searchTerm, ...prev.filter((q) => q !== searchTerm)].slice(0, 5)
//       );
//     }
//   }, [searchTerm]);

//   const filteredRecords = allRecords.filter((item) => {
//     const nameMatch =
//       item.business_name?.toLowerCase().includes(searchTerm) ||
//       item.product?.toLowerCase().includes(searchTerm);
//     const categoryMatch =
//       filteredCategory === "All" ||
//       item.product?.toLowerCase().includes(filteredCategory.toLowerCase());
//     const productMatch =
//       filteredProduct === "All" ||
//       item.product?.toLowerCase().includes(filteredProduct.toLowerCase());
//     const alphabetMatch =
//       !alphabetFilter ||
//       item.business_name?.toUpperCase().startsWith(alphabetFilter);
//     return nameMatch && categoryMatch && productMatch && alphabetMatch;
//   });

//   const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
//   const paginated = filteredRecords.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   //   const recommendedRecords = allRecords.filter(
// //     (item) =>
// //       !item.business_name?.toLowerCase().includes(searchTerm) &&
// //       !item.product?.toLowerCase().includes(searchTerm)
// //   );

// //   const categoryFiltered = recommendedRecords.filter((item) => {
// //     const categoryMatch =
// //       filteredCategory === "All" ||
// //       item.product?.toLowerCase().includes(filteredCategory.toLowerCase());
// //     const productMatch =
// //       filteredProduct === "All" ||
// //       item.product?.toLowerCase().includes(filteredProduct.toLowerCase());
// //     const alphabetMatch =
// //       !alphabetFilter || item.business_name?.toUpperCase().startsWith(alphabetFilter);

// //     return categoryMatch && productMatch && alphabetMatch;
// //   });

//   const renderCard = (item) => {
//     const displayName =
//       item.business_name || `${item.prefix} ${item.person_name}`;
//     const handleCardClick = (e) => {
//       if (!userData) {
//         e.preventDefault();
//         Swal.fire({
//           icon: "info",
//           title: "Login Required",
//           text: "Please log in to view profiles.",
//         }).then(() => navigate("/login"));
//       }
//     };

//     return (
//       <Link
//         to={`/profile/${item.user_id}`}
//         key={item.user_id}
//         className="text-decoration-none text-dark"
//         onClick={handleCardClick}
//       >
//         <div
//           className={`card mb-3 shadow-sm directory-card-hover ${
//             item.is_premium ? "bg-light-pink" : ""
//           }`}
//         >
//           <div className="row g-0">
//             <div className="col-md-2 d-flex align-items-center justify-content-center p-2">
//               <img
//                 src={item.profile_image}
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "https://via.placeholder.com/100";
//                 }}
//                 alt="Profile"
//                 className="img-fluid rounded"
//                 style={{ maxHeight: "100px", objectFit: "cover" }}
//               />
//             </div>
//             <div className="col-md-7">
//               <div className="card-body">
//                 <h5 className="card-title text-primary mb-1">{displayName}</h5>
//                 <p className="mb-1 text-muted small">
//                   <strong>Location:</strong> {item.city || "Not set"}
//                 </p>
//                 <p className="card-text text-muted small mb-2">
//                   <strong>Description:</strong> {item.description}
//                 </p>
//                 <p className="card-text text-muted small mb-0">
//                   <strong>Products:</strong>{" "}
//                   {Array.isArray(item.keywords)
//                     ? item.keywords.join(", ")
//                     : item.keywords}
//                 </p>
//               </div>
//             </div>
//             <div className="col-md-3 d-flex flex-column justify-content-between p-3">
//               <div className="btn btn-danger w-100 mb-2">
//                 <i className="bi bi-person-lines-fill me-2"></i> View Full
//                 Profile
//               </div>
//               <button
//                 className="btn btn-warning w-100 mb-2"
//                 onClick={(e) => e.preventDefault()}
//               >
//                 <i className="bi bi-envelope me-2"></i> Enquire
//               </button>
//               <a
//                 href={`tel:${item.mobile_number}`}
//                 className="btn btn-success w-100"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <i className="bi bi-telephone me-2"></i> Call
//               </a>
//             </div>
//           </div>
//         </div>
//       </Link>
//     );
//   };

//   return (
//     <div className="container mt-4">
//       <input
//         type="text"
//         className="form-control form-control-lg mb-4"
//         placeholder="Search products, businesses..."
//         value={searchTerm}
//         onChange={(e) => {
//           const newSearch = e.target.value.toLowerCase();
//           setSearchTerm(newSearch);
//           const params = new URLSearchParams(location.search);
//           params.set("query", newSearch);
//           window.history.replaceState(null, "", `?${params.toString()}`);
//         }}
//       />

//       <div className="carousel slide mb-4" data-bs-ride="carousel">
//         <div className="carousel-inner rounded shadow-sm">
//           {[banner1, banner2, banner3].map((banner, i) => (
//             <div
//               className={`carousel-item ${i === 0 ? "active" : ""}`}
//               data-bs-interval="3000"
//               key={i}
//             >
//               <img
//                 src={banner}
//                 className="d-block w-100"
//                 alt={`Promo ${i + 1}`}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-3 mb-4">
//           <div className="border rounded p-3 shadow-sm">
//             <h5 className="mb-3">Filters</h5>
//             <div className="form-group mb-3">
//               <label htmlFor="categorySelect">Category</label>
//               <select
//                 id="categorySelect"
//                 className="form-control"
//                 value={filteredCategory}
//                 onChange={(e) => {
//                   setFilteredCategory(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               >
//                 {categories.map((cat, i) => (
//                   <option key={i} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group mb-3">
//               <label>Trending Products</label>
//               <ul className="list-group">
//                 {trendingProducts.map((product, i) => (
//                   <li
//                     key={i}
//                     className={`list-group-item list-group-item-action ${
//                       filteredProduct === product ? "active" : ""
//                     }`}
//                     onClick={() => {
//                       setFilteredProduct(product);
//                       setCurrentPage(1);
//                     }}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {product}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="form-group mb-3">
//               <label>Alphabetical</label>
//               <div className="d-flex flex-wrap gap-1">
//                 {alphabet.map((char) => (
//                   <button
//                     key={char}
//                     className={`btn btn-sm ${
//                       alphabetFilter === char
//                         ? "btn-secondary"
//                         : "btn-outline-secondary"
//                     }`}
//                     onClick={() => {
//                       setAlphabetFilter(char);
//                       setCurrentPage(1);
//                     }}
//                   >
//                     {char}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="form-group mb-0">
//               <label>Recent Searches</label>
//               <ul className="list-group">
//                 {recentSearches.map((search, i) => (
//                   <li key={i} className="list-group-item">
//                     {search}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-9">
//           {filteredRecords.length > 0 ? (
//             <>
//               <h5 className="mb-3">Showing Results</h5>
//               {paginated.map(renderCard)}
//               <div className="d-flex justify-content-between align-items-center mt-4">
//                 <button
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                   disabled={currentPage === 1}
//                 >
//                   Prev
//                 </button>
//                 <span>
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={() =>
//                     setCurrentPage((p) => Math.min(p + 1, totalPages))
//                   }
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p>No results found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DirectoryPage;

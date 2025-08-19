import React, { useState } from "react";
import { supabase } from "../services/supabaseClient"; // adjust path if needed
import "../Css/FindNumber.css";

const FindNumber = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

const handleSearch = async (e) => {
  e.preventDefault();
  if (!query.trim()) {
    setResults([]);
    return;
  }

  setLoading(true);

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `id, user_type, mobile_number, person_name, business_name, profession, keywords, city, pincode, email`
    )
    .or(
      `mobile_number.ilike.%${query}%,` +
      `person_name.ilike.%${query}%,` +
      `business_name.ilike.%${query}%,` +
      `profession.ilike.%${query}%,` +
      `city.ilike.%${query}%,` +
      `pincode.ilike.%${query}%,` +
      `email.ilike.%${query}%`
    );

  setLoading(false);

  if (error) {
    console.error("Error fetching profiles:", error.message);
    setResults([]);
    return;
  }

  setResults(data || []);
};

  return (
    <div className="container mt-4">
      <div className="phone-checker-container">
        {/* Header Section */}
        <div className="header">
          <h1>Phone Number Checker: A Tool For Instant Verification</h1>
          <p>
            Instantly Verify Phone Numbers and Stay Protected with Our Powerful
            Phone Number Checker Tool!
          </p>
        </div>

        {/* Input Section */}
        <div className="checker-box">
          <h2>Phone Number Checker</h2>
          <p>Check phone numbers with 99.9% accuracy for seamless communication.</p>

          <div className="input-group">
            <input
              type="text"
              placeholder="Enter name, number, city, etc."
              className="phone-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="check-btn" onClick={handleSearch}>
              {loading ? "Checking..." : "Check"}
            </button>
          </div>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="results-box">
            <h3>Search Results</h3>
            <ul>
              {results.map((profile) => (
                <li key={profile.id} className="result-item">
                  <strong>
                    {profile.user_type === "person"
                      ? profile.person_name
                      : profile.business_name}
                  </strong>{" "}
                  - {profile.mobile_number} <br />
                  {profile.profession && <span>{profile.profession} • </span>}
                  {profile.city && <span>{profile.city}, </span>}
                  {profile.pincode && <span>{profile.pincode}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Features Section */}
        <div className="features-section">
          <div className="feature-card">
            <div className="icon blue">🔒</div>
            <h3>Secure and reliable</h3>
            <p>
              Our phone number checker ensures the highest level of data security
              and reliability, giving you accurate results while safeguarding your
              sensitive information.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon pink">📖</div>
            <h3>Online phone directory</h3>
            <p>
              Access a vast online phone directory to verify numbers instantly,
              ensuring your contact list is always up-to-date with accurate and
              relevant details.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon orange">🌍</div>
            <h3>Coimbatore's Database</h3>
            <p>
              Verify phone numbers from over whole coimbatore, allowing you to expand
              your global reach with precise data from trusted sources worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindNumber;

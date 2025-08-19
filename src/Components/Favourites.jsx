// Pages/Favourites.jsx
import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Favourites = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <div className="p-4">No favorites saved yet.</div>;
  }

  return (
    <div className="p-4">
      <h3 className="mb-4">Your Favourite Items</h3>
      <div className="row">
        {favorites.map((item) => (
          <div className="col-md-4 mb-3" key={item.id}>
            <div className="card shadow-sm h-100">
              <img
                src={item.profile_image || "/placeholder-logo.png"}
                alt={item.business_name || item.person_name}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {item.business_name || item.person_name}
                </h5>
                <p className="card-text text-muted">
                  {item.city || "Unknown City"}
                </p>
                {item.category && (
                  <span className="badge bg-primary">{item.category}</span>
                )}
              </div>
              <div className="card-footer d-flex justify-content-between">
                <Link
                  to={`/profile/${item.id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  View
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFavorite(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;

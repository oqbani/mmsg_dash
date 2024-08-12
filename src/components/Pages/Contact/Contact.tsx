import React, { useState } from "react";
import { FaFilter, FaHome, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import ShowContact from "./ShowContact";

const Contact: React.FC = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [sortOption, setSortOption] = useState("az");
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle search input visibility
  const handleToggleSearch = () => {
    setToggleSearch(!toggleSearch);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="contact">
      <div className="contact-content">
        {/* Navigation */}
        <div className="filter d-flex">
          <div>
            <Link to={"/"}>
              <FaHome />
              <span>Acceuil</span>
            </Link>
          </div>
          <div>
            <MdKeyboardArrowRight className="arrow" />
          </div>
          <div>
            <span className="subcategory">Messages</span>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="search pe-3">
          <div className="d-flex align-items-center">
            <h4 style={{ fontWeight: "700", marginLeft: "1rem" }}>
              La liste des messages reçus
            </h4>
          </div>
          <div className="search-icon">
            {toggleSearch && (
              <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                <div className="search-input">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Rechercher..."
                  />
                  <BiSearch className="search-input-icon" />
                </div>
                <div className="">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                  </select>
                </div>
              </div>
            )}
            {toggleSearch ? (
              <FaTimes
                className="filter-icon"
                onClick={handleToggleSearch}
              />
            ) : (
              <FaFilter
                className="filter-icon"
                onClick={handleToggleSearch}
              />
            )}
          </div>
        </div>

        {/* Show Contact Component */}
        <ShowContact searchTerm={searchTerm} sortOption={sortOption} />
      </div>
    </div>
  );
};

export default Contact;

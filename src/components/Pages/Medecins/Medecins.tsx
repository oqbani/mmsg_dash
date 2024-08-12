import React, { useState } from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import { FaFilter, FaHome, FaTimes } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import  ShowMedecins from "./ShowMedecins";
 "./AddMedecins";

const Medecins: React.FC = () => {
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
    <div className="Medecins">
      <div className="Medecins-content">
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
            <span className="subcategory">Medecins</span>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="search">
          <div className="d-flex align-items-center">
            <h4 style={{ fontWeight: "700" }}>La liste des médecins</h4>
          </div>
          <div className="search-icon">
            {toggleSearch && (
              <div className="d-flex align-items-center gap-3 flex-wrap">
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
              <FaTimes className="filter-icon" onClick={handleToggleSearch} />
            ) : (
              <FaFilter className="filter-icon" onClick={handleToggleSearch} />
            )}
          </div>
        </div>
        
        <div className="Btn-add-container">
          <Link to={"/medecins/add-medecin"} className="add-medecins">
            <span>Ajouter un médecin</span>
            <BiPlus className="addmedecin-icon" />
          </Link>
        </div>

        {/* Add Medecins Component */}
        <ShowMedecins sortOption={sortOption} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Medecins;

import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({isOpen, onClick}) => {
  const [searchInput, setSearchInput] = useState("");


  const handleChange = (ev) => {
    ev.preventDefault();
    setSearchInput(ev.target.value);
  };

  if (searchInput.length > 0) {
    //filter by name of blogue or category
  }

  return (
    <div className={`searchbar-container ${isOpen ? "opened" : "closed"}`}>
      <div className="search-rigth-side">
        <FontAwesomeIcon className="magnify-icon" icon={faMagnifyingGlass} />
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={searchInput}
        />
        </div>
      <FontAwesomeIcon className="close-icon" icon={faXmark} onClick={() => onClick(false)} />
    </div>
  );
};

export default SearchBar;

import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BlogCard from "../BlogCard/BlogCard";

const SearchBar = ({onChange, value}) => {

  return (
    <div className="searchbar-container">
      <div className="input-container">
        <FontAwesomeIcon className="mag-glass" size="2x" icon={faMagnifyingGlass} />
        <input
          value={value}
          className="searchBar"
          type="text"
          name="blog"
          placeholder="Search blog..."
          onChange={(ev) => onChange(ev)}
        />
      </div>
    </div>
  );
};

export default SearchBar;

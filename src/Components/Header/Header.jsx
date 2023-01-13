import React, { useState } from "react";
import "./Header.css";
import {
  faIdCard,
  faRightToBracket,
  faUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  let navigate = useNavigate();

  const [searchIsActive, setSearchIsActive] = useState(false);
  const toggleSearch = () => {
    setSearchIsActive(!searchIsActive);
  };

  return (
    <div className="header-container">
      <div onClick={() => navigate("/addBlog")} className="header-categories">
        Add your Blog
      </div>
      <div className="header-logo">
        <h1 className="header-name" onClick={() => navigate("/")}>
          THE HIDDEN PORTO
        </h1>
        <h2 className="header-subtitle">Welcome to the ❤️ of Portugal! </h2>
      </div>
      <div className="header-nav">
        <FontAwesomeIcon
          className="nav-icon"
          icon={faUser}
          onClick={() => navigate("/register")}
        />
        <FontAwesomeIcon
          className="nav-icon"
          icon={faRightToBracket}
          onClick={() => navigate("/login")}
        />
        <FontAwesomeIcon
          className="nav-icon"
          icon={faIdCard}
          onClick={() => navigate("/userProfile")}
        />
        <FontAwesomeIcon
          className="nav-icon"
          icon={faMagnifyingGlass}
          onClick={toggleSearch}
        />
        {/* user profile / register / login / search */}
      </div>
      <SearchBar isOpen={searchIsActive} onClick={setSearchIsActive} />
    </div>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
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
import Home from "../../Containers/Home/Home";

const Header = () => {
  let navigate = useNavigate();
  
  const [searchIsActive, setSearchIsActive] = useState(false);
  const toggleSearch = (ev) => {
    setSearchIsActive(true);
  };

  useEffect(() => {
  if(!searchIsActive) {
    <Home style={{opacity: 1}}/>


  } else {
    <Home style={{opacity: 0.5}}/>

  }
}, [searchIsActive])

  return (
    <div className="header-container">
      <div
        onClick={() =>
          setTimeout(() => {
            navigate("/addBlog");
          }, 500)
        }
        className="header-categories"
      >
        Add your Blog
      </div>
      <div className="header-logo">
        <h1
          className="header-name"
          onClick={() =>
            setTimeout(() => {
              navigate("/");
            }, 500)
          }
        >
          BLOGUE GUIDES
        </h1>
        <h2 className="header-subtitle">LIFESTYLE & TRAVEL</h2>
      </div>
      <div className="header-nav">
        <FontAwesomeIcon
          className="nav-icon"
          icon={faIdCard}
          onClick={() =>
            setTimeout(() => {
              navigate("/userProfile");
            }, 500)
          }
        />
        <FontAwesomeIcon
          className="nav-icon"
          icon={faRightToBracket}
          onClick={() =>
            setTimeout(() => {
              navigate("/login");
            }, 500)
          }
        />
        <FontAwesomeIcon
          className="nav-icon"
          icon={faUser}
          onClick={() =>
            setTimeout(() => {
              navigate("/register");
            }, 500)
          }
        />
        <FontAwesomeIcon
          className="nav-icon"
          icon={faMagnifyingGlass}
          onClick={toggleSearch}
        />
        {/* user profile / login / register / search */}
      </div>
      <SearchBar isOpen={searchIsActive} onClick={setSearchIsActive} />
    </div>
  );
};

export default Header;

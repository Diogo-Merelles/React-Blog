import React, { useState } from "react";
import "./Header.css";
import {
  faIdCard,
  faRightToBracket,
  faUser,
  faMagnifyingGlass,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useAuth } from "../../Contexts/AuthContext";
import Modal from "../Modal/Modal";

const Header = () => {
  const { loginData, logout } = useAuth();
  const { isLoggedIn } = loginData;

  let navigate = useNavigate();

  const [searchIsActive, setSearchIsActive] = useState(false);
  const toggleSearch = () => {
    setSearchIsActive(!searchIsActive);
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="header-container">
      <button onClick={() => navigate("/addBlog")} className="header-action">
        Add your Blog
      </button>
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
        {!isLoggedIn ? (
          <FontAwesomeIcon
            className="nav-icon"
            icon={faRightToBracket}
            onClick={() => navigate("/login")}
          />
        ) : (
          <FontAwesomeIcon
            className="nav-icon"
            icon={faDoorOpen}
            onClick={() => setShowLogoutModal(true)}
          />
        )}
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
      </div>
      <SearchBar isOpen={searchIsActive} onClick={setSearchIsActive} />
      <Modal
        show={showLogoutModal}
        title="Are you sure you want to logout?"
        confirmLabel="Logout"
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          setShowLogoutModal(false)
          navigate("/");
        }}
        btnType="danger"
      ></Modal>
    </div>
  );
};

export default Header;

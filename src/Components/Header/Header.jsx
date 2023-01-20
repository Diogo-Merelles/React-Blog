import React, { useState } from "react";
import "./Header.css";
import {
  faIdCard,
  faRightToBracket,
  faUser,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import Modal from "../Modal/Modal";

const Header = () => {
  const { userData, loginData, logout } = useAuth();
  const { isLoggedIn } = loginData;

  let navigate = useNavigate();

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
        {!isLoggedIn && (
          <FontAwesomeIcon
            className="nav-icon"
            icon={faUser}
            onClick={() => navigate("/register")}
          />
        )}
        {isLoggedIn && (
          <FontAwesomeIcon
            className="nav-icon"
            icon={faIdCard}
            onClick={() => navigate(`/userProfile/${userData.id}`)}
          />
        )}
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
      </div>
      <Modal
        show={showLogoutModal}
        title="Are you sure you want to logout?"
        confirmLabel="Logout"
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          setShowLogoutModal(false);
          navigate("/");
        }}
        btnType="danger"
      ></Modal>
    </div>
  );
};

export default Header;

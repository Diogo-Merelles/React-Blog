import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { toast } from "react-toastify";
import { useAxiosGet } from "../../Services/axiosHook";
import { useAuth } from "../../Contexts/AuthContext";
import { errorCheck } from "../../Services/validate";
import { useNavigate, useParams, Link } from "react-router-dom";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";
import userProfileSVG from "../../Images/undraw_profile_re_4a55.svg";

const initialUserState = {
  email: "",
  password: "",
};

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(initialUserState);
  const [editProfile, setEditProfile] = useState(false);
  const { email, password } = userProfile;

  const navigate = useNavigate();

  const { id } = useParams();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const inputHandler = (ev) => {
    setUserProfile((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  };

  useEffect(() => {
    if (id) {
      setEditProfile(true);
      getProfile(id);
    } else {
      setEditProfile(false);
    }
  }, [id]);

  const [loginErr, setLoginErr] = useState({
    emailError: "",
    passwordError: "",
  });

  const {loading } = useAxiosGet(
    `http://localhost:5000/user/${id}`,
    {
      onComplete: (data) => {
        setUserProfile(data);
      },
      onError: () => {
        toast.error("Something went wrong. Try again later");
      },
    }
  );

  if (loading) {
    return <span>Loading...</span>;
  }

  const errorHandler = (ev) => {
    let error = "";

    error = errorCheck(ev.target.name, ev.target.value);

    setLoginErr((prevState) => ({
      ...prevState,
      [ev.target.name + "Error"]: error,
    }));
  };

  const getProfile = async (id) => {
    const singleProfile = await axios.get(`http://localhost:5000/user/`);
    if (singleProfile.status === 200) {
      setUserProfile({ email, password });
    } else {
      toast.error("Something went wrong, try again later");
    }
  };

  const userHandleSubmit = async () => {
    if (email && password) {
      const response = await axios.put(
        `http://localhost:5000/user/${id}`,
        userProfile
      );

      if (response.status === 200) {
        toast.success("Successfully updated Blog!");
      } else {
        toast.error("Something went wrong :( Try again later");
      }
    }
    setUserProfile({ email: "", password: "" });
    navigate("/");
  };

  return (
    userProfile && (
      <>
      <div className="test">
        <form className="login-update-form">
          <div className="main-content">
            <h1>Update Credentials</h1>
          </div>
          <input
            placeholder="E-mail"
            type="email"
            name="email"
            className="login-input"
            required
            value={email}
            onChange={inputHandler}
            onBlur={(ev) => errorHandler(ev)}
          />
          <div className="errorMsg">{loginErr.emailError}</div>
          <input
            placeholder="Password"
            type="password"
            name="password"
            className="login-input"
            required
            value={password}
            onChange={inputHandler}
            onBlur={(ev) => errorHandler(ev)}
          />
          <div className="errorMsg">{loginErr.passwordError}</div>
          <div className="userProfileButtons">
            <button
              className="basicInput createAccBtn goBack"
              onClick={() => navigate("/")}
            >
              Go Back
            </button>
            <button
              type="submit"
              className="basicInput createAccBtn"
              onSubmit={userHandleSubmit}
              onClick={() => setShowLogoutModal(true)}
            >
              Confirm changes
            </button>
          </div>
          <Modal
            show={showLogoutModal}
            title="Are you sure you want to keep these changes?"
            confirmLabel="Update Profile"
            btnType="primary"
            onClose={() => setShowLogoutModal(false)}
            onConfirm={() => {
              // logout();
              setShowLogoutModal(false);
              navigate("/");
            }}
          />
          {/* {isLoginPending && <div>Please wait...</div>} */}
        </form>
        <img
          className="userProfileSVG"
          src={userProfileSVG}
          alt="user-profileSVG"
        />
        </div>
      </>
    )
  );
};

export default UserProfile;

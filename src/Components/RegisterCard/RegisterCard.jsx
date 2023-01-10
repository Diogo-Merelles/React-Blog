import React, { useState } from "react";
import "./RegisterCard.css";
import { Link, useNavigate } from "react-router-dom";
import { errorCheck } from "../../Services/validate";
import registerImg from "../../Images/clerigos.jpeg";
import axios from "axios";
import { toast } from "react-toastify";

const initualUserState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const RegisterCard = () => {
  const [formUser, setFormUser] = useState(initualUserState);
  const { firstName, lastName, email, password } = formUser;
  const navigate = useNavigate();

  const [userError, setUserError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
  });

  const inputHandler = (ev) => {
    setFormUser((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  };

  const errorHandler = (ev) => {
    let error = "";

    error = errorCheck(ev.target.name, ev.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [ev.target.name + "Error"]: error,
    }));
  };

  const handleSubmit = async () => {
    // let userObj = { ...user };
    // console.log(regObj)

    // if (firstName && lastName && email && password) {
    const response = await axios.post("http://localhost:5000/user");

    if (response.status === 201) {
      toast.success("Congratulation! You just created an account");
    } else {
      toast.error("Sorry, something went wrong. Try again later");
    }
    navigate("/login");
    console.log("teste");
    // }
  };

  return (
    <form className="registerLayout" onSubmit={handleSubmit}>
      <div className="right-side-form">
        <img
          src={registerImg}
          alt="Torre dos Clérigos"
          className="register-img"
        ></img>
      </div>
      <div className="left-side-form">
        <h1>Create new account</h1>
        <p>
          Already a member? <Link to="/login">Log in</Link>
        </p>
        <div className="register-form">
          <div className="personalNames">
            <input
              placeholder="First Name"
              type="text"
              name="firstName"
              required
              value={firstName}
              className="basicInput"
              onChange={inputHandler}
              onBlur={(ev) => errorHandler(ev)}
            />
            <div className="errorMsg">{userError.firstNameError}</div>

            <input
              placeholder="Last Name"
              type="text"
              name="lastName"
              className="basicInput"
              required
              value={lastName}
              onChange={inputHandler}
              onBlur={(ev) => errorHandler(ev)}
            />
            <div className="errorMsg">{userError.lastNameError}</div>
          </div>

          <input
            placeholder="E-mail"
            type="email"
            name="email"
            className="basicInput"
            required
            value={email}
            onChange={inputHandler}
            onBlur={(ev) => errorHandler(ev)}
          />
          <div className="errorMsg">{userError.emailError}</div>

          <input
            placeholder="Password"
            type="password"
            name="password"
            className="basicInput"
            required
            value={password}
            onChange={inputHandler}
            onBlur={(ev) => errorHandler(ev)}
          />
          <div className="errorMsg">{userError.passwordError}</div>
          <button type="submit" className="basicInput createAccBtn">
            Create Account
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterCard;

import React, { useState } from "react";
import "./RegisterCard.css";
import { Link } from "react-router-dom";
import { errorCheck } from "../../Services/validate";

const RegisterCard = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const [userError, setUserError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    password2Error: "",
  });

  const inputHandler = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const errorHandler = (e) => {
    let error = "";

    error = errorCheck(e.target.name, e.target.value);

    if (e.target.name === "password2") {
      if (user.password !== user.password2) {
        error = "Write the same password twice";
      }
    }

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  return (
    <div className="registerLayout">
      <div className="right-side-form">
        <h1>Create new account</h1>
        <p>
          Already a member? <Link to="/login">Log in</Link>
        </p>
      </div>
      <div className="register-form">
        <div className="registerCardMiddle">
          <input
            placeholder="First Name"
            type="text"
            name="t"
            className="basicInput"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e)}
          />
          <div className="errorMsg">{userError.firstNameError}</div>

          <input
            placeholder="Last Name"
            type="text"
            name="name"
            className="basicInput"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e)}
          />
          <div className="errorMsg">{userError.firstNameError}</div>

          <input
            placeholder="E-mail"
            type="email"
            name="name"
            className="basicInput"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e)}
          />
          <div className="errorMsg">{userError.emailError}</div>

          <input
            placeholder="Password"
            type="password"
            name="password"
            className="basicInput"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e)}
          />
          <div className="errorMsg">{userError.passwordError}</div>

          <input
            placeholder="Repeat password"
            type="password"
            name="password2"
            className="basicInput"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e)}
          />
          <div className="errorMsg">{userError.password2Error}</div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;

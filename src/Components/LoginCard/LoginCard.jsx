import React, { useState, useEffect } from "react";
import "./LoginCard.css";
import { Link, useNavigate } from "react-router-dom";
import { errorCheck } from "../../Services/validate";
import { useAuth } from "../../Contexts/AuthContext";
import Admin from '../../Containers/Admin/Admin'

const initialLoginState = {
  email: "",
  password: "",
};

const LoginCard = () => {
  const { loginData, login } = useAuth();
  const { isLoginPending, isLoggedIn} = loginData;
  const [isAdmin, setIsAdmin] = useState(false);

  const [loginUser, setLoginUser] = useState(initialLoginState);
  const { email, password } = loginUser;

  const navigate = useNavigate();

  const [loginErr, setLoginErr] = useState({
    emailError: "",
    passwordError: "",
  });

  const errorHandler = (ev) => {
    let error = "";

    error = errorCheck(ev.target.name, ev.target.value);

    setLoginErr((prevState) => ({
      ...prevState,
      [ev.target.name + "Error"]: error,
    }));
  };

  const inputHandler = (ev) => {
    setLoginUser((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginUser;
    login(email, password);
  };

  useEffect(() => {
    if(isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn])

  if(isLoggedIn) {
    return <span>Redirecting...</span>;
  }

  if(email === "admin@gmail.com" && password === "admin123") {
    navigate("/admin")
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <div className="main-content">
        <h1>Login</h1>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
      <input
        placeholder="E-mail"
        type="email"
        name="email"
        className="login-input"
        id="email-input"
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
        id="password-input"
        required
        value={password}
        onChange={inputHandler}
        onBlur={(ev) => errorHandler(ev)}
      />
      <div className="errorMsg">{loginErr.passwordError}</div>
      <button type="submit" className="basicInput createAccBtn">
        Sign in
      </button>
      {isLoginPending && <div>Please wait...</div>}
    </form>
  );
};

export default LoginCard;

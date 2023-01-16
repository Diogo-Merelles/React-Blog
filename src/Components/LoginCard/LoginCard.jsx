import React, { useState, useEffect } from "react";
import "./LoginCard.css";
import { Link, useNavigate } from "react-router-dom";
import { errorCheck } from "../../Services/validate";
import { useAuth } from "../../Contexts/AuthContext";

const initialLoginState = {
  email: "",
  password: "",
};

const LoginCard = () => {
  const { loginData, login } = useAuth();
  const { isLoginPending, isLoggedIn} = loginData;

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

  // const loginSubmit = async () => {
  //     if(validation()) {
  //         console.log("test");
  //         const response = await axios.get("http://localhost:5000/user" + loginUser.email, {...loginUser} );

  //         if(response.status === 200) {
  //             console.log(response.data);
  //             console.log("test2")
  //             if(Object.keys(response.data).length === 0) {
  //               toast.error("User Email doesn't exist.")
  //             } else {
  //               if(response.password === password) {
  //                   toast.success("Login succesfull")
  //                   sessionStorage("email", loginUser.email);
  //                   navigate("/")
  //               } else {
  //                 toast.error("Password is incorrect.")
  //               }
  //             }
  //         } else {
  //             toast.error("Something went wrong, try again later")
  //         }
  //     }
  // }
  // const validation = () => {
  //     let result = true;
  //     if(loginUser.email === '' || loginUser.email === null) {
  //         result = false;
  //     }
  //     if(loginUser.password === '' || loginUser.password === null) {
  //         result = false;
  //     }
  //     return result;
  // }

  useEffect(() => {
    if(isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn])

  if(isLoggedIn) {
    return <span>Redirecting...</span>;
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
      <button type="submit" className="basicInput createAccBtn">
        Sign in
      </button>
      {isLoginPending && <div>Please wait...</div>}
    </form>
  );
};

export default LoginCard;

import React from "react";
import LoginCard from "../../Components/LoginCard/LoginCard";
import './Login.css'
import loginSVG from "../../Images/undraw_appreciate_it_re_yc8h (1).svg"

const Login = () => {
  return (
    <div className="loginDesign">
      <LoginCard />
      <img className="loginSVG" src={loginSVG} alt="login-svg" />
    </div>
  );
};

export default Login;

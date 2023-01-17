import React from "react";
import RegisterCard from "../../Components/RegisterCard/RegisterCard";
import './Register.css'
import registerSVG from "../../Images/undraw_join_re_w1lh.svg"

const Register = () => {
  return (
    <div className="registerDesign">
      <RegisterCard />
      <img className="registerSVG" src={registerSVG} alt="join-svg" />
    </div>
  );
};

export default Register;

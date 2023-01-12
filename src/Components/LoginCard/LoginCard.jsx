import React, {useState} from 'react'
import './LoginCard.css'
import { Link, useNavigate } from "react-router-dom";
import { errorCheck } from "../../Services/validate";

const initialLoginState = {
    email: "",
    password: ""
}

const LoginCard = () => {

    const [loginUser, setLoginUser] = useState(initialLoginState);
    const {email, password} = loginUser;
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [loginError, setLoginError] = useState({
        emailError: "",
        passwordError: ""
    });

    const errorHandler = (ev) => {
        let error = "";
    
        error = errorCheck(ev.target.name, ev.target.value);
    
        setLoginError((prevState) => ({
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

    const login = (ev) => {

    }

  return (
    <form className='login-form' onSubmit={login}>
        <div className="main-content">
            <h1>Login</h1>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
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
          <div className="errorMsg">{loginError.emailError}</div>
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
          <div className="errorMsg">{loginError.passwordError}</div>
          <button type="submit" className="basicInput createAccBtn">
            Sign in
          </button>
    </form>
  )
}

export default LoginCard
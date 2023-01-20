import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { get } from "../Services/apiCalls";

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: !!localStorage.getItem("userData"),
  isLoginPending: false,
};

const AuthProvider = (props) => {

  const [loginData, setLoginData] = useState(initialState);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || null);

  const setLoginPending = (isLoginPending) => setLoginData({ isLoginPending });
  const setLoginSuccess = (isLoggedIn) => setLoginData({ isLoggedIn });

  const handleLoginError = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    toast.error("Email and/or password is incorrect. Try again")
  };

  const login = async (email, password) => {
    setLoginPending(true);
    setLoginSuccess(false);

    const { data, error } = await get(
      `http://localhost:5000/user?email=${email}`
    );
    if (data) {
      if (data.length > 0) {
        const user = data[0];
        if (user.password === password) {
          setLoginPending(false)
          setLoginSuccess(true)
          toast.success("You are logged in")
          const {firstName, lastName, email, id, admin} = user; //dont save password
          const newUserData = {firstName, lastName, email, id, admin}
          localStorage.setItem('userData', JSON.stringify(newUserData))
          setUserData(newUserData)
        } else {
          handleLoginError();
        }
      } else {
        handleLoginError();
      }
    } else if (error) {
      handleLoginError();
    }
  };

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setUserData(null);
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        loginData,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth should only be used within AuthProvider");
  return context;
};

export default AuthProvider;

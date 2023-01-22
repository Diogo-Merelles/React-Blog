import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./Containers/Home/Home";
import AddBlog from "./Containers/AddBlog/AddBlog";
import Blog from "./Containers/Blog/Blog";
import Login from "./Containers/Login/Login";
import Admin from "./Containers/Admin/Admin";
import Register from "./Containers/Register/Register";
import UserProfile from "./Containers/UserProfile/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header/Header";
import { useAuth } from "./Contexts/AuthContext";

const ProtectedRoute = ({ allow, children }) => {
  if (!allow) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const { loginData } = useAuth();
  const { isLoggedIn } = loginData;
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/addBlog"
            element={
              <ProtectedRoute allow={isLoggedIn}>
                <AddBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editBlog/:id"
            element={
              <ProtectedRoute allow={isLoggedIn}>
                <AddBlog />
              </ProtectedRoute>
            }
          />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={
              <ProtectedRoute allow={!isLoggedIn}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userProfile/:id"
            element={
              <ProtectedRoute allow={isLoggedIn}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allow={isLoggedIn}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/login" replace /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

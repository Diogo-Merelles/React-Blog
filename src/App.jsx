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
import ErrNotFound from "./Containers/ErrNotFound/ErrNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header/Header";
import { useAuth } from "./Contexts/AuthContext";

const LoggedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const { userData } = useAuth();
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
              <LoggedRoute user={userData}>
                <AddBlog />
              </LoggedRoute>
            }
          />
          <Route
            path="/editBlog/:id"
            element={
              <LoggedRoute user={userData}>
                <AddBlog />
              </LoggedRoute>
            }
          />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/userProfile"
            element={
              <LoggedRoute user={userData}>
                <UserProfile />
              </LoggedRoute>
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<ErrNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

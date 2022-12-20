import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './Containers/Home/Home';
import AddBlog from './Containers/AddBlog/AddBlog';
import Blog from './Containers/Blog/Blog';
import Login from './Containers/Login.jsx/Login';
import Register from './Containers/Register/Register';
import UserProfile from './Containers/UserProfile/UserProfile';
import ErrNotFound from './Containers/ErrNotFound/ErrNotFound';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addBlog" element={<AddBlog />} />
        <Route path="/editBlog/:id" element={<AddBlog />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="*" element={<ErrNotFound />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

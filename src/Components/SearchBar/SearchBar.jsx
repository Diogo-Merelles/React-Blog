import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getSearchedBlogs } from "../../Services/apiCalls";
import BlogCard from "../BlogCard/BlogCard";

const SearchBar = ({ isOpen, onClick }) => {
  const [searchInput, setSearchInput] = useState("");
  const [blogs, setBlogs] = useState([]);

  const handleSearchInput = (ev) => {
    setSearchInput((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  };

  // const [searchIsActive, setSearchIsActive] = useState(false);
  // const toggleSearch = () => {
  //   setSearchIsActive(!searchIsActive);
  // };

  useEffect(() => {
    async function fecthData() {
      let response = await getSearchedBlogs(searchInput);
      setBlogs(response.data);
    }
    fecthData();
  }, [searchInput]);

  return (
    <div className={`searchbar-container ${isOpen ? "opened" : "closed"}`}>
      <div className="search-rigth-side">
        <FontAwesomeIcon className="magnify-icon" icon={faMagnifyingGlass} />
        <input
          className="searchBar"
          type="text"
          name="input"
          id="input"
          title="input"
          placeholder="Search"
          onChange={(ev) => handleSearchInput(ev)}
          value={searchInput}
        />
      </div>
      <FontAwesomeIcon
        className="close-icon"
        icon={faXmark}
        onClick={() => onClick(false)}
      />
      <div className="search-show">
        {blogs.map((blog) => {
          return (
            <div className="div" key={blog.id}></div>
              // <BlogCard
              // key={blog.id}
              // title={blog.title}
              // description={blog.description}
              // imageUrl={blog.imageUrl}
              // category={blog.category}
              // date={blog.date}
              // />
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;

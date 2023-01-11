import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {getSearchedBlogs} from "../../Services/apiCalls"
import BlogCard from "../BlogCard/BlogCard";
 
const SearchBar = ({isOpen, onClick}) => {
  const [searchInput, setSearchInput] = useState("");
  const [blogs, setBlogs] = useState([]);

 

  const handleSearchInput = (ev) => {
    ev.preventDefault();
    setSearchInput((prevState) => ({
      ...prevState, [ev.target.name]:ev.target.value,
    }))
  };

  useEffect(() => {
    async function fecthData() {
      let response = await getSearchedBlogs(searchInput);
      console.log(response);
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
        onChange={(ev) => {
          handleSearchInput(ev)
        }}
        value={searchInput}
        />
        </div>
        {/* {blogs?.map((blogs) => {
          return (
            <BlogCard key={blogs.id} />
          )
        })} */}
      <FontAwesomeIcon className="close-icon" icon={faXmark} onClick={() => onClick(false)} />
    </div>
  );
};

export default SearchBar;

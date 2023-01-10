import React, { useState, useEffect } from "react";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Pagination from "../../Components/Pagination/Pagination";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(4);

  const deleteHandler = async (id) => {
    if (window.confirm("All Blog info will be deleted. Are you sure?")) {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        toast.success("Blog deleted successfully");
        bringBlogData();
      } else {
        toast.error("Something went wrong, try again later");
      }
    }
  };

  const showMore = (string) => {
    if (string.length > 50) {
      string = string.substring(0, 50) + " ... ";
    }
    return string;
  };

  useEffect(() => {
    bringBlogData();
  }, []);

  const bringBlogData = async () => {
    const response = await axios.get("http://localhost:5000/blogs");
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong, try again later");
    }
  };

  //Get Current Post
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlog = data.slice(indexOfFirstBlog, indexOfLastBlog);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <React.Fragment>
      {data.length === 0 && (
        <div className="noBlogFound">No blog was found... Try again later</div>
      )}
      <h4 className="welcomeHome-msg">Welcome! Here you see all the blogs people wrote about the city of Porto.<br /> If you want to contribute, just go over to "Add your Blog" on the top. Have fun! :)</h4>
      <div className="home-container">
        <div className="homeShowBlog">
          {data &&
            data.map((item, index) => (
              <BlogCard
                key={index}
                {...item}
                showMore={showMore}
                deleteHandler={deleteHandler}
              />
            ))}
          <Pagination blogsPerPAge={blogsPerPage} totalBlogs={data.length} paginate={paginate} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

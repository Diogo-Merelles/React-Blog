import React, { useState, useEffect } from "react";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import BlogCard from "../../Components/BlogCard/BlogCard";

const Home = () => {
  const [data, setData] = useState([]);

  const deleteHandler = () => {};

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

  return (
    <React.Fragment>
      {data.length === 0 && (
        <div className="noBlogFound">No blog was found</div>
      )}
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

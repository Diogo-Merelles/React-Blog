import React, { useState } from "react";
import "./Blog.css";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxiosGet } from "../../Services/axiosHook";

const Blog = () => {
  const [blogDetail, setBlogDetail] = useState();
  const { id } = useParams();

  const {loading } = useAxiosGet(
    `http://localhost:5000/blogs/${id}`,
    {
      onComplete: (data) => {
        setBlogDetail(data);
      },
      onError: () => {
        toast.error("Something went wrong. Try again later");
      },
    }
  );

  // useEffect(() => {
  //   if (!loading) {
  //     if (data) {
  //       setBlogDetail(data);
  //     } else if (error) {
  //       toast.error("Something went wrong. Try again later");
  //     }
  //   }
  // }, [data, error, loading]);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    blogDetail && (
      <div className="single-blog-container">
        <Link to="/">Go Back</Link>
        <div className="title">{blogDetail && blogDetail.title}</div>
        <img src={blogDetail && blogDetail.imageUrl} alt={blogDetail.title} />
        <div className="description">
          <p>{blogDetail.description}</p>
        </div>
        <div className="date">
          {blogDetail && blogDetail.date + " | " + blogDetail.category}
        </div>
      </div>
    )
  );
};

export default Blog;

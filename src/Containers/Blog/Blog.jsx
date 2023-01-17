import React, { useState } from "react";
import "./Blog.css";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxiosGet } from "../../Services/axiosHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBackward} from "@fortawesome/free-solid-svg-icons";

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
        <div className="title-id">{blogDetail && blogDetail.title}</div>
        <img className="img-id" src={blogDetail && blogDetail.imageUrl} alt={blogDetail.title} />
        <div className="description-id">
          <p>{blogDetail.description}</p>
        </div>
        <div className="date-id">
          {blogDetail && blogDetail.date + " | " + blogDetail.category}
        </div>
        <Link className="go-back" color="#89ABE3FF" to="/">Go Back<FontAwesomeIcon icon={faBackward} /></Link>
      </div>
    )
  );
};

export default Blog;

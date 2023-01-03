import React from "react";
import "./BlogCard.css";
import { useNavigate } from "react-router-dom";

const BlogCard = ({
  title,
  description,
  imageURL,
  category,
  deleteHandler,
}) => {
  const navigate = useNavigate();

  return <div>BlogCard</div>;
};

export default BlogCard;

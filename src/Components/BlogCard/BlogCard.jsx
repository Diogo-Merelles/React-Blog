import React from "react";
import "./BlogCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const BlogCard = ({
  title,
  description,
  id,
  imageUrl,
  category,
  date,
  deleteHandler,
  showMore,
}) => {
  return (
    <div className="cardDesign">
      <img src={`${imageUrl}`} className="card-image" alt={title}></img>
      <div className="card-title">{title}</div>
      <div className="card-description">
        {showMore(description)}
        <Link to={`/blog/${id}`}>Find out more</Link>
      </div>
      <div className="card-footer">
        <span>
          {category}
          {" | " + date}
        </span>
      </div>
      <div className="card-icons">
        <div className="edit-icon">
          <Link to={`/editBlog/${id}`}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link>
        </div>
        <div className="trash-icon">
          <FontAwesomeIcon
            color="red"
            icon={faTrash}
            onClick={() => deleteHandler(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

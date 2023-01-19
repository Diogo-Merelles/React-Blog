import React from "react";
import "./BlogCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Contexts/AuthContext";

const showMore = (string) => {
  if (string && string.length > 50) {
    string = string.substring(0, 50) + " ... ";
  }
  return string;
};

const BlogCard = ({
  title,
  description,
  id,
  imageUrl,
  category,
  date,
  deleteHandler,
  authorId
}) => {
  const { userData } = useAuth();
  const hasActions = userData ? authorId === userData.id : false;


  return (
    <div className="cardDesign">
      <img src={`${imageUrl}`} className="card-image" alt={title}></img>
      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-description">
          {showMore(description)}
          <Link to={`/blog/${id}`}>Find out more</Link>
        </div>
        {hasActions && (
            <div className="card-icons">
              <div className="edit-icon">
                <Link to={`/editBlog/${id}`} id={`blog-${id}-edit-action`}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </div>
              <div className="trash-icon">
                <FontAwesomeIcon
                  color="#D70040"
                  icon={faTrash}
                  id={`blog-${id}-remove-action`}
                  onClick={() => deleteHandler(id)}
                />
              </div>
            </div>
          )}
        <div className="card-actions">
          <div className="card-info">
            <span>Category: {category}</span>
            <span>Date: {date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

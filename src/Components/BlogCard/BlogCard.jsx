import React, { useState } from "react";
import "./BlogCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";

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
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="cardDesign">
      <img src={`${imageUrl}`} className="card-image" alt={title}></img>
      <div className="card-title">{title}</div>
      <div className="card-description">
        {showMore(description)}
        <Link to={`/blog/${id}`}>Find out more</Link>
      </div>
      <div className="card-bottom">
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
              color="#D70040"
              icon={faTrash}
              onClick={() => (
                <Modal open={openModal} onClose={() => setOpenModal(false)} />
              )}
              // onClick={() => deleteHandler(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

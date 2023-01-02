import React, { useState } from "react";
import axios from "axios";
import {
  MDBValidation,
  MDBInput,
  MDBBtn,
  MDBTextArea,
  MDBFile,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AddBlog.css";

// wuegilen

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
};

const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

const AddBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErr, setCategoryErr] = useState(null);
  const { title, description, category, imageUrl } = formValue;

  const navigate = useNavigate();

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    return today;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!category) {
      setCategoryErr("Please select a category");
    }
    if (title && description && imageUrl && category) {
      const currentDate = getDate();
      const updatedBlogDate = { ...formValue, date: currentDate };
      const response = await axios.post(
        "http://localhost:5000/blogs",
        updatedBlogDate
        );
      if (response.status === 201) {
        toast.success("Successfully created a new Blog!");
      } else {
        toast.error("Something went wrong :( Try again later");
      }
      setFormValue({ title: "", description: "", category: "", imageUrl: "" });
      navigate("/");
    }
  };

  const onInputChange = (ev) => {
    let { name, value } = ev.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImage = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wuegilen");
    axios
      .post("http://api.cloudinary.com/v1_1/dxaepqu6q/image/upload", formData)
      .then((res) => {
        toast.info("Image uploaded Successfully!");
        setFormValue({ ...formValue, imageUrl: res.data.url });
      })
      .catch((error) => {
        toast.error("Something went wrong :( Try again later");
      });
  };

  const onCategoryChange = (ev) => {
    setCategoryErr(null);
    setFormValue({ ...formValue, category: ev.target.value });
  };

  return (
    <MDBValidation className="row g-3" onSubmit={handleSubmit}>
      <p className="fs-2 fw-bold">Add Blog</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
          padding: "2em",
          maxWidth: "26em",
          alignContent: "center",
        }}
      >
        <MDBInput
          defaultValue={title || ""}
          name="title"
          type="text"
          onChange={onInputChange}
          required
          label="Title"
          validation="You need to provide a title!"
          invalid="true"
        />

        <br />
        <MDBTextArea
          defaultValue={description || ""}
          onChange={onInputChange}
          required
          label="Description"
          validation="You need to provide a description!"
          rows={4}
        />
        <br />
        <MDBFile
          label="Choose an image for your blog!"
          type="file"
          onChange={(ev) => onUploadImage(ev.target.files[0])}
          required
          validation="You need to provide an image!"
          invalid="true"
        />
        <br />
        <select
          required
          className="categoryDropdown"
          onChange={onCategoryChange}
          value={category}
        >
          <option>Select category</option>
          {options.map((option, index) => (
            <option value={option || ""} key={index}>
              {option}
            </option>
          ))}
        </select>
        {categoryErr && <div className="categoryErr">{categoryErr}</div>}
        <br />
        <div className="btn-wrapper">
          <MDBBtn
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ marginRight: "0.8em" }}
          >
            Add your blog
          </MDBBtn>
          <MDBBtn
            className="btn btn-danger btn-lg"
            style={{ marginRight: "0.8em" }}
            onClick={() => navigate("/")}
          >
            Go back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
};

export default AddBlog;

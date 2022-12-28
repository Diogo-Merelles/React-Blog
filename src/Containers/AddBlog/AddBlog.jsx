import Reac, { useState } from "react";
import axios from "axios";
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea, MDBFile, MDBValidationItem} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AddBlog.css"

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

  const handleSubmit = (ev) => {};

  const onInputChange = (ev) => {};

  const onUploadImage = (file) => {};

  const onCategoryChange = () => {};

  return (
    <MDBValidation className="row-g3" noValidate onSubmit={handleSubmit}>
      <p className="fs-2 fw-bold">Add Blog</p>
      <div
        className="form-wrapper"
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
          value={title || ""}
          id="title"
          className="form-control"
          name="title"
          type="text"
          onChange={onInputChange}
          required
          label="Title"
          validation="You need to provide a title"
          invalid
        />
        
        <br />
        <MDBTextArea
          value={description || ""}
          onChange={onInputChange}
          required
          label="Description"
          placeholder="Write your blog here!"
          validation="You need to provide a description"
          rows={4}
        />
        <br />
        <MDBFile
          id="customFile"
          label="Image for your blog"
          type="file"
          onChange={(ev) => onUploadImage(ev.target.files)}
          required
          validation="You need to provide an image"
          invalid
        />
        <br />
        <select
          required
          className="categoryDropdown"
          onChange={onCategoryChange}
          value={category}
          style={{marginBottom: "1em"}}
        >
          <option>Select category</option>
          {options.map((option, index) => (
            <option value={option || ""} key={index}>
              {option}
            </option>
          ))}
        </select>
        <br />
        <div className="btn-wrapper">
        <MDBBtn type="submit" className="btn btn-primary btn-lg" style={{marginRight: "0.8em"}}>
          Add your blog
        </MDBBtn>
        <MDBBtn className="btn btn-danger btn-lg" style={{marginRight: "0.8em"}} onClick={() => navigate("/")}>
          Go back
        </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
};

export default AddBlog;

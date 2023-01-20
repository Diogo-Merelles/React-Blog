import React, { useState, useEffect } from "react";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Modal from "../../Components/Modal/Modal";
import { useLazyAxiosGet } from "../../Services/axiosHook";
import SearchBar from "../../Components/SearchBar/SearchBar";

const Home = () => {
  const [blogCards, setBlogCards] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [showDeleteModal, setShowDeteleModal] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);

  const { fetchData: getBlogCardsData, loading } = useLazyAxiosGet(
    "http://localhost:5000/blogs",
    {
      onComplete: (data) => {
        setBlogCards(data);
        setShowDeteleModal(false);
        setCurrentBlogId(null);
      },
      onError: () => {
        toast.error("Something went wrong. Try again later");
        setShowDeteleModal(false);
        setCurrentBlogId(null);
      },
    }
  );

  const deleteHandler = async (id) => {
    const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
    if (response.status === 200) {
      toast.success("Blog deleted successfully");
      getBlogCardsData();
    } else {
      toast.error("Something went wrong, try again later");
    }
  };

  useEffect(() => {
    getBlogCardsData();
  }, []);

  useEffect(() => {
    const getSearchData = setTimeout(() => {
      if (searchInput) {
        getBlogCardsData({
          title_like: searchInput,
          _sort: "title",
          _order: "asc",
        });
      } else {
        getBlogCardsData();
      }
    }, 1000);
    return () => clearTimeout(getSearchData);
  }, [searchInput]);

  const handleDelete = (id) => {
    setShowDeteleModal(true);
    setCurrentBlogId(id); //
  };

  if (loading) {
    return <span>Loading...</span>;
  }

  // console.log(searchInput);

  return blogCards.length !== 0 ? (
    <React.Fragment>
      <h4 className="welcomeHome-msg">
        Welcome! Here you see all the blogs people wrote about the city of
        Porto.
        <br /> If you want to contribute, just go over to "Add your Blog" on the
        top. Have fun! :)
      </h4>
      <SearchBar
        value={searchInput}
        onChange={(ev) => {
          setSearchInput(ev.target.value);
        }}
      />
      <div className="homeShowBlog">
        <div className="home-container">
          {blogCards.map((blogCard, index) => (
            <BlogCard
              key={index}
              {...blogCard}
              deleteHandler={(id) => handleDelete(id)}
            />
          ))}
        </div>
      </div>
      <Modal
        show={showDeleteModal}
        title="Are you sure you want to delete your blog?"
        confirmLabel="Delete"
        onClose={() => setShowDeteleModal(false)}
        onConfirm={() => deleteHandler(currentBlogId)}
        btnType="danger"
      >
        <p>This action can't be undone!</p>
      </Modal>
    </React.Fragment>
  ) : (
    <div>No blogs found...</div>
  );
};

export default Home;

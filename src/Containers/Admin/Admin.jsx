import React, { useEffect, useState } from "react";
import "./Admin.css";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useLazyAxiosGet } from "../../Services/axiosHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../Components/Modal/Modal";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../Services/apiCalls";

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null)
  const [showDeleteModal, setShowDeteleModal] = useState(false);
  const navigate = useNavigate();

  const { userData } = useAuth()


  const deleteHandler = async () => {
    const response = await deleteUser(`http://localhost:5000/user/${currentUserId}`);
    if (response.status === 200) {
      toast.success("User deleted successfully");
      setShowDeteleModal(false);
      getUsers()
    } else {
      toast.error("Something went wrong, try again later");
    }
  };


  const { fetchData: getUsers ,loading } = useLazyAxiosGet(`http://localhost:5000/user/`, {
    onComplete: (data) => {
      setAllUsers(data);
      setShowDeteleModal(false);
      setCurrentUserId(null);
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
      setShowDeteleModal(false);
      setCurrentUserId(null);
    },
  });

  useEffect(() => {
    getUsers()
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (userData.admin === false) {
    navigate("/");
  }

  
  return allUsers.length > 0 ? (
    <>
      <MDBListGroup className="d-flex flex-wrap justify-content-center align-items-center" horizontal style={{minWidthL: "22rem" }} light>
        {allUsers.map((user) => (
          <MDBListGroupItem
            style={{
              backgroundColor: "#89ABE3FF",
              padding: "8px",
              margin: "8px",
              fontWeight: "bolder"
            }}
            key={user.id}
          >
            First Name: {user.firstName}
            <br />
            Last Name: {user.lastName}
            <br />
            Email: {user.email}
            <br />
            <div className="action-buttons">
              <FontAwesomeIcon
                size="lg"
                color="red"
                icon={faTrash}
                onClick={() => {
                  setCurrentUserId(user.id)
                  setShowDeteleModal(true);
                }}
              />
            </div>
          </MDBListGroupItem>
        ))}
      </MDBListGroup>
      <Modal
        show={showDeleteModal}
        title="Are you sure you want to delete the user?"
        confirmLabel="Delete"
        onClose={() => setShowDeteleModal(false)}
        onConfirm={() => deleteHandler()}
        btnType="danger"
      >
        <p>This action can't be undone!</p>
      </Modal>
    </>
  ) : (
    <div>No users found...</div>
  );
};

export default Admin;

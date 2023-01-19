import React, { useState } from "react";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useAxiosGet } from "../../Services/axiosHook";

const Admin = () => {
  const [allUsers, setAllUsers] = useState();

  const { loading } = useAxiosGet(`http://localhost:5000/user/`, {
    onComplete: (data) => {
      setAllUsers(data);
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });

  if (loading) {
    return <span>Loading...</span>;
  }
  return (
    <MDBListGroup style={{ minWidthL: "22rem" }} light>
        {allUsers.map((user) => (<MDBListGroupItem key={user.id}>{user.firstName}</MDBListGroupItem>))}
    </MDBListGroup>
  );
};

export default Admin;

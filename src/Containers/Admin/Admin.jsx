import React from "react";
import { useAuth } from "../../Contexts/AuthContext";

const Admin = () => {
  const { userData } = useAuth();

  return (
    <ol>
      {userData.map((user, index) => (
        <li value={user} key={index}>
            {userData}
        </li>
      ))}
    </ol>
  );
};

export default Admin;

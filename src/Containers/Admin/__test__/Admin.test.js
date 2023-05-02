import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Admin from "./Admin";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../Services/apiCalls";

jest.mock("../../Contexts/AuthContext");
jest.mock("../../Services/apiCalls");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Admin Component", () => {
  const setUserData = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({ userData: { admin: true }, setUserData });
    useNavigate.mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading spinner while data is being fetched", async () => {
    const { getByText } = render(<Admin />);
    expect(getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => expect(getUserData).toHaveBeenCalled());
  });

  it("should render a list of users and delete a user on click of the trash icon", async () => {
    const users = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@example.com",
      },
    ];
    const response = { status: 200 };
    deleteUser.mockResolvedValueOnce(response);

    useLazyAxiosGet.mockReturnValue({
      fetchData: jest.fn().mockResolvedValueOnce(users),
      loading: false,
    });

    render(<Admin />);

    users.forEach((user) => {
      expect(screen.getByText(user.firstName)).toBeInTheDocument();
      expect(screen.getByText(user.lastName)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
      const deleteButton = screen.getByLabelText(`delete user ${user.id}`);
      fireEvent.click(deleteButton);
      expect(screen.getByText("Are you sure you want to delete the user?")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Delete"));
      waitFor(() => expect(deleteUser).toHaveBeenCalledWith(`http://localhost:5000/user/${user.id}`));
      expect(setShowDeleteModal).toHaveBeenCalledTimes(2);
      expect(setShowDeleteModal).toHaveBeenLastCalledWith(false);
      expect(setCurrentUserId).toHaveBeenCalledTimes(2);
      expect(setCurrentUserId).toHaveBeenLastCalledWith(null);
      expect(getUsers).toHaveBeenCalledTimes(2);
    });
  });

  it("should redirect to home page if user is not an admin", async () => {
    useAuth.mockReturnValue({ userData: { admin: false } });
    render(<Admin />);
    await waitFor(() => expect(getUserData).toHaveBeenCalled());
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
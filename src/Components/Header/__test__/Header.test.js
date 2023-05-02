import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { AuthContext } from "../../Contexts/AuthContext";
import Header from "./Header";

describe("Header", () => {
  const userData = { id: 123, name: "John Doe" };
  const loginData = { isLoggedIn: true };
  const logout = jest.fn();

  const renderComponent = (isLoggedIn, userData) => {
    return render(
      <AuthContext.Provider value={{ userData, loginData: { isLoggedIn }, logout }}>
        <Header />
      </AuthContext.Provider>
    );
  };

  it("should render the logo and navigation elements", () => {
    renderComponent(false, {});

    expect(screen.getByText("THE HIDDEN PORTO")).toBeInTheDocument();
    expect(screen.getByText("Welcome to the ❤️ of Portugal!")).toBeInTheDocument();
    expect(screen.getByText("Add your Blog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add your Blog/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
  });

  it("should navigate to the user profile page when the user icon is clicked", () => {
    renderComponent(true, userData);

    const userIcon = screen.getByTestId("user-icon");
    fireEvent.click(userIcon);

    expect(screen.getByText("User Profile")).toBeInTheDocument();
  });

  it("should display a logout confirmation modal when the door icon is clicked", () => {
    renderComponent(true, userData);

    const logoutIcon = screen.getByTestId("logout-icon");
    fireEvent.click(logoutIcon);

    expect(screen.getByText("Are you sure you want to logout?")).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: "Logout" });
    fireEvent.click(confirmButton);

    expect(logout).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Are you sure you want to logout?")).not.toBeInTheDocument();
  });
});
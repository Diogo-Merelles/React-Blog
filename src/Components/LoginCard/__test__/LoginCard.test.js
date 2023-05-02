import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContextProvider } from "../../Contexts/AuthContext";
import LoginCard from "./LoginCard";

describe("LoginCard", () => {
  beforeEach(() => {
    render(
      <AuthContextProvider>
        <LoginCard />
      </AuthContextProvider>
    );
  });

  it("renders a login form with email and password inputs", () => {
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("displays an error message when email input is invalid", () => {
    const emailInput = screen.getByPlaceholderText("E-mail");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);
    expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
  });

  it("displays an error message when password input is invalid", () => {
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText("Password must be at least 6 characters long")).toBeInTheDocument();
  });

  it("displays a 'Please wait...' message when login is pending", () => {
    fireEvent.submit(screen.getByRole("button", { name: "Sign in" }));
    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });
});
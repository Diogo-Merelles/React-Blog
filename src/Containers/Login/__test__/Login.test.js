import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login", () => {
  it("should render the LoginCard component", () => {
    render(<Login />);

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("should render the loginSVG image", () => {
    render(<Login />);

    expect(screen.getByAltText("login-svg")).toBeInTheDocument();
  });
});
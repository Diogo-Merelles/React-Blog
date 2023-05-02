import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "./Register";

describe("Register", () => {
  it("should render the RegisterCard component", () => {
    render(<Register />);
    expect(screen.getByTestId("register-card")).toBeInTheDocument();
  });

  it("should render the registerSVG image", () => {
    render(<Register />);
    expect(screen.getByAltText("join-svg")).toBeInTheDocument();
  });
});
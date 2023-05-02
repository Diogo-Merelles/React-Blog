import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import RegisterCard from "./RegisterCard";

describe("RegisterCard", () => {
  it("renders the RegisterCard component", () => {
    render(<RegisterCard />);
    expect(screen.getByText("Create new account")).toBeInTheDocument();
  });

  it("handles input change", async () => {
    render(<RegisterCard />);
    const firstNameInput = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput.value).toBe("John");
  });

  it("handles form submission", async () => {
    const mockUpdateData = jest.fn();
    jest.mock("../../Services/axiosHook", () => ({
      useAxiosPost: () => ({
        updateData: mockUpdateData,
        loading: false,
      }),
    }));
    const { container } = render(<RegisterCard />);
    const firstNameInput = container.querySelector("#firstName-input");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    const lastNameInput = container.querySelector("#lastName-input");
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    const emailInput = container.querySelector("#email-input");
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    const passwordInput = container.querySelector("#password-input");
    fireEvent.change(passwordInput, { target: { value: "12345678" } });
    const submitButton = container.querySelector(".createAccBtn");
    fireEvent.click(submitButton);
    await waitFor(() => expect(mockUpdateData).toHaveBeenCalled());
  });

  it("displays error messages on input blur", async () => {
    render(<RegisterCard />);
    const firstNameInput = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "" } });
    fireEvent.blur(firstNameInput);
    await waitFor(() =>
      expect(
        screen.getByText("Please enter your first name")
      ).toBeInTheDocument()
    );
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "" } });
    fireEvent.blur(lastNameInput);
    await waitFor(() =>
      expect(
        screen.getByText("Please enter your last name")
      ).toBeInTheDocument()
    );
    const emailInput = screen.getByPlaceholderText("E-mail");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);
    await waitFor(() =>
      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument()
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.blur(passwordInput);
    await waitFor(() =>
      expect(
        screen.getByText("Password must have at least 8 characters")
      ).toBeInTheDocument()
    );
  });
});
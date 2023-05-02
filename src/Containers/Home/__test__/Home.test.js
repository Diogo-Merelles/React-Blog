import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Home from "./Home";

jest.mock("axios");

describe("Home", () => {
  describe("when the blog cards are loaded", () => {
    beforeEach(() => {
      axios.get.mockResolvedValueOnce({
        data: [
          {
            id: 1,
            title: "Test blog 1",
            author: "John Doe",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            id: 2,
            title: "Test blog 2",
            author: "Jane Smith",
            content: "Nulla facilisi. Mauris interdum lectus vitae nunc.",
          },
        ],
      });
      render(<Home />);
    });

    it("should display the blog cards", async () => {
      await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

      expect(screen.getByText("Test blog 1")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")).toBeInTheDocument();

      expect(screen.getByText("Test blog 2")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("Nulla facilisi. Mauris interdum lectus vitae nunc.")).toBeInTheDocument();
    });

    it("should allow deleting a blog card", async () => {
      axios.delete.mockResolvedValueOnce({
        status: 200,
      });

      await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

      const deleteButton = screen.getAllByRole("button", { name: "Delete" })[0];
      userEvent.click(deleteButton);

      expect(screen.getByText("Are you sure you want to delete your blog?")).toBeInTheDocument();
      expect(screen.getByText("This action can't be undone!")).toBeInTheDocument();

      const confirmButton = screen.getByRole("button", { name: "Delete" });
      userEvent.click(confirmButton);

      await waitForElementToBeRemoved(() => screen.getByText("Are you sure you want to delete your blog?"));

      expect(screen.queryByText("Test blog 1")).not.toBeInTheDocument();
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
      expect(screen.queryByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")).not.toBeInTheDocument();
    });
  });

  describe("when the blog cards fail to load", () => {
    beforeEach(() => {
      axios.get.mockRejectedValueOnce(new Error("Unable to fetch blog cards"));
      render(<Home />);
    });

    it("should display an error message", async () => {
      await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

      expect(screen.getByText("Something went wrong. Try again later")).toBeInTheDocument();
    });
  });
});
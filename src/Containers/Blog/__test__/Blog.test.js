import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { useAxiosGet } from "../../Services/axiosHook";
import Blog from "./Blog";

jest.mock("../../Services/axiosHook");

describe("Blog component", () => {
  it("should render loading state when data is not yet available", async () => {
    useAxiosGet.mockReturnValue({
      loading: true,
    });

    const { getByText } = render(
      <MemoryRouter initialEntries={["/blog/1"]}>
        <Route path="/blog/:id">
          <Blog />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("Loading...")).toBeInTheDocument();
    });
  });

  it("should render the blog details when data is available", async () => {
    const mockBlog = {
      id: 1,
      title: "Test Blog",
      description: "This is a test blog",
      imageUrl: "https://example.com/test-image.jpg",
      date: "2022-05-01",
      category: "Test Category",
    };

    useAxiosGet.mockReturnValue({
      loading: false,
      data: mockBlog,
    });

    const { getByText, getByAltText } = render(
      <MemoryRouter initialEntries={["/blog/1"]}>
        <Route path="/blog/:id">
          <Blog />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText(mockBlog.title)).toBeInTheDocument();
      expect(getByAltText(mockBlog.title)).toBeInTheDocument();
      expect(getByText(mockBlog.description)).toBeInTheDocument();
      expect(getByText(mockBlog.date)).toBeInTheDocument();
      expect(getByText(mockBlog.category)).toBeInTheDocument();
    });
  });

  it("should show an error message when there's an error fetching the data", async () => {
    useAxiosGet.mockReturnValue({
      loading: false,
      error: true,
    });

    const { getByText } = render(
      <MemoryRouter initialEntries={["/blog/1"]}>
        <Route path="/blog/:id">
          <Blog />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        getByText("Something went wrong. Try again later")
      ).toBeInTheDocument();
    });
  });
});
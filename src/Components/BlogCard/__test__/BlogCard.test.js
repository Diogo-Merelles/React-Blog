import React from "react";
import { shallow } from "enzyme";
import BlogCard from "../BlogCard";

describe("BlogCard", () => {
  const props = {
    title: "Test Blog Title",
    description: "Test Blog Description",
    id: "123",
    imageUrl: "https://testimage.com",
    category: "Test Category",
    date: "May 1, 2023",
    deleteHandler: jest.fn(),
    authorId: "456",
  };

  it("should render the component without errors", () => {
    const wrapper = shallow(<BlogCard {...props} />);
    expect(wrapper.find(".cardDesign")).toHaveLength(1);
  });

  it("should render the correct title and description", () => {
    const wrapper = shallow(<BlogCard {...props} />);
    expect(wrapper.find(".card-title").text()).toEqual(props.title);
    expect(wrapper.find(".card-description").text()).toEqual(
      props.description
    );
  });

  it("should call the deleteHandler function when the trash icon is clicked", () => {
    const wrapper = shallow(<BlogCard {...props} />);
    wrapper.find("#blog-123-remove-action").simulate("click");
    expect(props.deleteHandler).toHaveBeenCalledWith(props.id);
  });

  it("should not show the edit and trash icons when the user is not the author", () => {
    const wrapper = shallow(<BlogCard {...props} />);
    expect(wrapper.find(".edit-icon")).toHaveLength(0);
    expect(wrapper.find(".trash-icon")).toHaveLength(0);
  });

  it("should show the edit and trash icons when the user is the author", () => {
    const wrapper = shallow(
      <BlogCard {...props} authorId="456" userData={{ id: "456" }} />
    );
    expect(wrapper.find(".edit-icon")).toHaveLength(1);
    expect(wrapper.find(".trash-icon")).toHaveLength(1);
  });
});
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal component", () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();
  const cancelLabel = "Cancel";
  const confirmLabel = "Confirm";
  const title = "Test Modal";
  const children = <p>Test Content</p>;
  const btnType = "primary";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    const { getByText } = render(<Modal show={true} />);
    expect(getByText("Modal title")).toBeInTheDocument();
    expect(getByText("Ok")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
  });

  it("renders correctly with custom props", () => {
    const { getByText } = render(
      <Modal
        show={true}
        title={title}
        cancelLabel={cancelLabel}
        confirmLabel={confirmLabel}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        btnType={btnType}
        children={children}
      />
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(confirmLabel)).toBeInTheDocument();
    expect(getByText(cancelLabel)).toBeInTheDocument();
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("calls onClose function when close button is clicked", () => {
    const { getByRole } = render(
      <Modal show={true} onClose={onCloseMock} />
    );

    fireEvent.click(getByRole("button", { name: /close/i }));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onConfirm function when confirm button is clicked", () => {
    const { getByRole } = render(
      <Modal show={true} onConfirm={onConfirmMock} />
    );

    fireEvent.click(getByRole("button", { name: /ok/i }));
    expect(onConfirmMock).toHaveBeenCalled();
  });
});
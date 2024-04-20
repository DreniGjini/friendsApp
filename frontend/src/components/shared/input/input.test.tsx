import { fireEvent, render, screen } from "@testing-library/react";
import Input from "./index";

describe("Component renders correctly", () => {
  test("is in the document and value changes", () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, {
      target: { value: "Somethig..." },
    });
    expect(inputElement).toHaveValue("Somethig...");
  });
});

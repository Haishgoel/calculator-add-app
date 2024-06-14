import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "@/app/page";
import "@testing-library/jest-dom";



test("renders Add Calculator component", () => {
  render(<InputField />);
  expect(screen.getByText("Add Calculator")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter numbers")).toBeInTheDocument();
  expect(screen.getByText("Calculate")).toBeInTheDocument();
});

test("calculates sum for an empty string", () => {
  render(<InputField />);
  const inputValue = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(inputValue, { target: { value: "" } });
  fireEvent.click(button);
  expect(screen.getByText("Add: 0")).toBeInTheDocument();
});

test("calculates sum for a single number", () => {
  render(<InputField />);
  const inputValue = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(inputValue, { target: { value: "1" } });
  fireEvent.click(button);
  expect(screen.getByText("Add: 1")).toBeInTheDocument();
});

test("calculates sum for two numbers", () => {
  render(<InputField />);
  const inputValue = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(inputValue, { target: { value: "1,5" } });
  fireEvent.click(button);
  expect(screen.getByText("Add: 6")).toBeInTheDocument();
});

test("calculates sum for multiple numbers", () => {
  render(<InputField />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "1,2,3,4,5,6,7" } });
  fireEvent.click(button);
  expect(screen.getByText("Add: 28")).toBeInTheDocument();
});

test("calculates sum for numbers with new lines", () => {
  render(<InputField />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "1\\n2,3" } });
  fireEvent.click(button);
  expect(screen.getByText("Add: 6")).toBeInTheDocument();
});

test("calculates sum for numbers", () => {
  render(<InputField />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "//;\\n1;2" } });
  fireEvent.click(button);
  expect(screen.getByText("Add: 3")).toBeInTheDocument();
});

test("error for negative numbers", () => {
  render(<InputField />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "1,-2,3" } });
  fireEvent.click(button);
  expect(
    screen.getByText("Negative numbers not allowed: -2")
  ).toBeInTheDocument();
});

test("error for multiple negative numbers", () => {
  render(<InputField />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate");
  fireEvent.change(input, { target: { value: "1,-2,-3,-4,-5,-6" } });
  fireEvent.click(button);
  expect(
    screen.getByText("Negative numbers not allowed: -2, -3, -4, -5, -6")
  ).toBeInTheDocument();
});

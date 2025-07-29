import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import '@testing-library/jest-dom';

test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Hi, I'm"
  );
});

test("displays an image of yourself", () => {
  render(<App />);
  expect(screen.getByRole("img")).toBeInTheDocument();
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "About Me"
  );
});

test("displays a paragraph for your biography", () => {
  render(<App />);
  expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);
  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute("href", "https://github.com");
  expect(links[1]).toHaveAttribute("href", "https://linkedin.com");
});

test("the form includes text inputs for name and email address", () => {
  render(<App />);
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes).toHaveLength(3);
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");
  checkboxes.forEach((checkbox) => {
    expect(checkbox).not.toBeChecked();
  });
});

test("the page shows information the user types into the name and email address form fields", async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText(/name/i), "Derrick");
  await userEvent.type(screen.getByLabelText(/email/i), "derrick@example.com");
  expect(screen.getByLabelText(/name/i)).toHaveValue("Derrick");
  expect(screen.getByLabelText(/email/i)).toHaveValue("derrick@example.com");
});

test("checked status of checkboxes changes when user clicks them", async () => {
  render(<App />);
  const [tech, design, writing] = screen.getAllByRole("checkbox");

  await userEvent.click(tech);
  await userEvent.click(design);

  expect(tech).toBeChecked();
  expect(design).toBeChecked();
  expect(writing).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText(/name/i), "Derrick");
  await userEvent.type(screen.getByLabelText(/email/i), "derrick@example.com");
  const checkboxes = screen.getAllByRole("checkbox");
  await userEvent.click(checkboxes[0]); // tech
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  const confirmationParagraphs = screen.getAllByText(
    (_, element) =>
      element?.textContent.includes("You selected:") &&
      element.textContent.includes("tech")
  );

  expect(confirmationParagraphs.length).toBeGreaterThan(0);
});

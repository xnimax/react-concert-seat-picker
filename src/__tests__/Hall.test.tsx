import React from "react";
import { render, screen } from "@testing-library/react";
import Hall from "./../components/hall/Hall";
import userEvent from "@testing-library/user-event";

test("render hall", () => {
  render(<Hall />);
  const title = screen.getByText(/STAGE IS HERE/i);
  expect(title).toBeInTheDocument();
});
test("data should be exist", () => {
  render(<Hall />);
  const btns = screen.getAllByRole("button");
  expect(btns.length).toBeGreaterThan(0);
});

test("button click", async () => {
  render(<Hall />);
  const btns = screen.getAllByRole("button");
  const img = btns[0].getElementsByTagName("img")[0];
  const src = img.getAttribute("src");
  userEvent.click(btns[0]);

  const isCorrect = isImageSourceCorrectAfterClick(
    img.getAttribute("src"),
    src
  );
  if (isCorrect === "error") {
    await screen.findByText("This chair is taken.")
  } else {
    // eslint-disable-next-line
    expect(isCorrect).toBeTruthy();
  }
});
type domType = string | null;

const isImageSourceCorrectAfterClick = (
  currentDom: domType,
  previousImg: domType
) => {
  switch (previousImg) {
    case "chair-available.png":
      return currentDom === "chair-reserved.png";
    case "chair-reserved.png":
      return currentDom === "chair-available.png";
    case "chair-unavailable.png":
      return "error";
    default:
      return false;
  }
};

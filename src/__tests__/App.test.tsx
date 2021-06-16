import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
it("should render properly", () => {
    render(<App />);
})

it("should have proper title", () => {
  render(<App />);
  const title = screen.getByLabelText("title");
  expect(title).toHaveTextContent(/STAGE IS HERE/i);
  expect(title).toHaveStyle(`
    color:#ffffff;
    text-align: center;
  `);
});

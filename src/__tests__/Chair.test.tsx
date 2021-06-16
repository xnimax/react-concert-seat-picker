import React from "react";

import { render, screen } from "@testing-library/react";
import Chair from "../components/chair/Chair";
import { ChairData } from "../components/hall/Hall";
import userEvent from "@testing-library/user-event";

it("should render and work properly", () => {
  const sampleData: ChairData[] = [
    { id: 1, row: 1, col: 1, isTaken: false, vip: true },
    { id: 2, row: 1, col: 1, isTaken: true, vip: false },
    { id: 3, row: 1, col: 1, isTaken: false, vip: false },
  ];
  const cb = jest.fn();
  render(
    <>
      {sampleData.map((item) => (
        <Chair key={item.id} data={item} onClick={cb} />
      ))}
    </>
  );

  const normalChair = screen.getAllByRole("button")[2];
  userEvent.click(normalChair);
  expect(cb).toHaveBeenCalledTimes(1);
});

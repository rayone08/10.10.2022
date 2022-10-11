import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Sbutton from "../index";

test("renders passed parameter in Sbutton component", () => {
  render(<Sbutton text="Click" />);
  const buttonElement = screen.getByText(/click/i);
  expect(buttonElement).toBeInTheDocument();
});

import { render, screen} from "@testing-library/react";
import Edu from "./edu.js"

test("should render Login component", () => {
  render(<Edu />);
  const Element = screen.getByText(/EDU-SETU/i);
  expect(Element).toBeInTheDocument();
  // expect(LoginElement).toHaveTextContent('');
});
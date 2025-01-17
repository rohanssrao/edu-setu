import { render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Postings from "./Components/ProfessorDashboard/Postings.js";
import StudentDashboard from "./Components/studentdashboard/studentdashboard.jsx";
import { StudentProfile } from "./Components/studentdashboard/studentProfile.jsx";
import Edu from "./edu.js"


test("should render Login component", () => {
  render(<Edu />);
  const Element = screen.getByText(/EDU-SETU/i);
  expect(Element).toBeInTheDocument();
  // expect(LoginElement).toHaveTextContent('');
});

//STUDENT TESTS

test("Student Homepage populates correctly", () => {
  render(<StudentDashboard />);
  expect(screen.getByText('Search for a research role')).toBeInTheDocument();
  expect(screen.getByText('Postings')).
    toBeInTheDocument();
  expect(screen.getByText('Location')).toBeInTheDocument();
});

test("Student profile populates correctly", async () => {
  render(<StudentProfile />);
  expect(screen.getByText('Profile Settings')).toBeInTheDocument();
});

test("Department filter populates", async () => {
  render(<StudentDashboard /> );
  await userEvent.click(screen.getByText('Department'));
  await screen.findByText('All');
  expect(screen.getByText('All')).toBeInTheDocument();
});

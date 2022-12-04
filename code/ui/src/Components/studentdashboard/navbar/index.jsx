import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './index.css';
import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';

function clearSessions() {
  sessionStorage.clear();
}
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));
export function NavBar({ name }) {
  return (
    <>
      <link rel="stylesheet" type="text/css" href="./index.css" />

      <Navbar bg="light" variant="light" fixed="top" id="navbar" style={{ zIndex: 0 }}>
        <Container>
          <Navbar.Brand href="/student/home">
            <img src={`${process.env.PUBLIC_URL}/assets/images/Edu_Setu_Logo_Transparent.png`} alt="Logo" id="logo" />
            {name}
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/student/home" class="underline-hover-effect" id="underline-hover-effect">Postings</Nav.Link>
            <Nav.Link href="/student/savedJobs" class="underline-hover-effect" id="underline-hover-effect">Saved Jobs</Nav.Link>
            <Nav.Link href="/student/trackApplications" class="underline-hover-effect" id="underline-hover-effect"> Applications</Nav.Link>
            <Dropdown >
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"  >
                <img src="https://www.pngmart.com/files/21/Account-Avatar-Profile-PNG-Clipart.png" id="profileNavLogo" />

              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item href="/student/myProfile">Profile</Dropdown.Item>
                <Dropdown.Item href="/">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default NavBar;
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './index.css';

export function NavBar() {
  return (
    <>
      
      <Navbar bg="primary" variant="dark" fixed="top" >
        <Container>
          {/*<img src={`${process.env.PUBLIC_URL}/assets/images/main-logo.jpeg`}  alt="Logo" id="logo"/>*/}
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Saved Jobs</Nav.Link>
            <Nav.Link href="#features">Applications</Nav.Link>
            <Nav.Link href="#pricing">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default NavBar;
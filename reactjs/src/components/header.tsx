import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo.svg'

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} className="App-logo" alt="logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#link1">Link1</Nav.Link>
            <Nav.Link href="#link2">Link2</Nav.Link>
            <Nav.Link href="#link3">Link3</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
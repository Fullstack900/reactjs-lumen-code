import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <Navbar bg="light" variant="secondary" fixed='bottom'>
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="#f-link1">Link1</Nav.Link>
          <Nav.Link href="#f-link2">Link2</Nav.Link>
          <Nav.Link href="#f-link3">Link3</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Footer;
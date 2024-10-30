
import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap"



export const Header = () => {

  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container fluid>
      <Navbar.Brand href="#">Sucursales de: </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="#action1">Home</Nav.Link>
          
       
        </Nav>
        <Form className="d-flex">
  
          <Button variant="outline-success">AGREGAR SUCURSAL</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}




import { useState } from "react";
import { Button, Container, Form, Nav, Navbar} from "react-bootstrap"
import { CrearSucursal } from "../../modals/SucursalModals/CrearSucursal";


export const Header = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

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

             {/* Modal */}
      {openModal && <CrearSucursal
        openModal={openModal}
        setOpenModal={setOpenModal} />}
        <Form className="d-flex">
  
          <Button variant="outline-success" onClick={toggleModal}>AGREGAR SUCURSAL</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
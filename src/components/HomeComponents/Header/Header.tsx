
import { useState } from "react";
import { Button, Container, Form, Nav, Navbar} from "react-bootstrap"
import { CrearSucursal } from "../../../modals/SucursalModals/CrearSucursal";
import { useAppSelector } from "../../../hooks/redux";


export const Header = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const empresaActiva=useAppSelector((state)=> state.empresaReducer.elementActive);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container fluid>
      <Navbar.Brand href="#">Sucursales de: {empresaActiva?.nombre}</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
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
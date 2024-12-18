import { useState } from "react";
import { Button, Container, Navbar} from "react-bootstrap"
import { CrearSucursal } from "../../../modals/SucursalModals/CrearSucursal";
import { useAppSelector } from "../../../hooks/redux";
import styles from "./Header.module.css"


export const Header = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const empresaActiva=useAppSelector((state)=> state.empresaReducer.empresaActiva);

  return (
    <div className={styles.principalHeaderContainer}>
      {
        empresaActiva && (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <h1 className={styles.headerTitle}>Sucursales de {empresaActiva?.nombre}</h1>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                   {/* Modal */}
            {openModal && <CrearSucursal
              openModal={openModal}
              setOpenModal={setOpenModal} 
              empresaActiva={empresaActiva}/>}
                <Button variant="outline-success" onClick={toggleModal} className="ms-auto" style={{ marginRight: "40px" }}>AGREGAR SUCURSAL</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>)}
      
    </div>
  )
}
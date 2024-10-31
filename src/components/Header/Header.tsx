
import { useEffect, useState } from "react";
<<<<<<< HEAD
import styles from "./Header.module.css";
import { SucursalService } from "../../services/ParticularServices/SucursalService";
import { useAppDispatch } from "../../hooks/redux";
import { setDataTable } from "../../redux/slices/TableReducer";
import { CrearSucursal } from "../../views/Modals/CrearSucursal/CrearSucursal";

const API_URL = import.meta.env.VITE_API_URL;

export const Header = () => {
=======
import { Button, Container, Form, Nav, Navbar} from "react-bootstrap"
import { SucursalService } from "../../services/ParticularServices/SucursalService";
import { useAppDispatch } from "../../hooks/redux";
import { setDataTable } from "../../redux/slices/TableReducer";
import { CrearSucursal } from "../../modals/SucursalModals/CrearSucursal";

const API_URL=import.meta.env.VITE_API_URL;

export const Header = () => {

  const [loading, setLoading] = useState(false);
>>>>>>> 73ff9feea0854e6fcd6eb876815746b8bd02922b
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const sucursalService = new SucursalService(API_URL + "/sucursales");
  const dispatch = useAppDispatch();

  const getSucursales = async () => {
    await sucursalService.getAll().then((sucursalData) => {
      dispatch(setDataTable(sucursalData));
    });
  };

  useEffect(() => {
    getSucursales();
  }, []);
  
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

<<<<<<< HEAD
        {/* Modal */}
        {openModal && (
          <CrearSucursal
            getSucursales={getSucursales}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        )}

        <div className={styles.containerHeader}>
          <div className={styles.containerTitulo}>
            <div>
              <p className={styles.headerTitulo}>Sucursales de: </p>
            </div>
            <div>
              <p>Aparece el nombre de la Empresa</p>
            </div>
          </div>

          <div className={styles.divContainerAddSucursal}>
            <button
              className={styles.containerAddSucursal}
              onClick={toggleModal}
            >
              AGREGAR SUCURSAL
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
=======
             {/* Modal */}
      {openModal && <CrearSucursal getSucursales={getSucursales}
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


>>>>>>> 73ff9feea0854e6fcd6eb876815746b8bd02922b

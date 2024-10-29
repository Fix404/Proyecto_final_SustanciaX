import { useEffect, useState } from "react";
import styles from "./Header.module.css"
import { SucursalService } from "../../../services/ParticularServices/SucursalService";
import { useAppDispatch } from "../../../hooks/redux";
import { setDataTable } from "../../../redux/slices/TableReducer";
import { CrearSucursal } from "../../../views/Modals/CrearSucursal/CrearSucursal";
import { Body } from "../Body/Body";

const API_URL=import.meta.env.VITE_API_URL;


export const Header = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const sucursalService = new SucursalService(API_URL + "/sucursales");
  const dispatch = useAppDispatch();


  const getSucursales = async () => {
    await sucursalService.getAll().then((sucursalData) => {
      dispatch(setDataTable(sucursalData));
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getSucursales();
  }, []);

  return (
    <>
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="sidebar p-3"
          style={{
            width: "20%",
            backgroundColor: "#f4eae9",
            height: "100vh",
          }}
        >
          {/* <Sidebar onAddEmpresaClick={toggleModal}/> */}
        </div>

         {/* Modal */}
      {openModal && <CrearSucursal getSucursales={getSucursales}
        openModal={openModal}
        setOpenModal={setOpenModal} />}

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
  <button className={styles.containerAddSucursal} onClick={toggleModal}>AGREGAR SUCURSAL</button>
</div>

</div>
      </div>
    </>
  )
}

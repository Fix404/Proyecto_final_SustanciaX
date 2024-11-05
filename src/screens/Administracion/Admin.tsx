import { BodyAdmin } from "../../components/AdminComponents/BodyAdmin/BodyAdmin"
import { HeaderAdmin } from "../../components/AdminComponents/HeaderAdmin/HeaderAdmin"
import { SidebarAdmin } from "../../components/AdminComponents/SidebarAdmin/SidebarAdmin"
import { useSelector } from "react-redux";
import styles from "./Admin.module.css";
import { RootState } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { VerProducto } from "../../UI/PopUps/VerProducto/VerProducto";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { CrearAlergeno } from "../../modals/AlergenoModals/CrearAlergeno";
import { ServiceAlergeno } from "../../services/ParticularServices/AlergenoService";

export const Admin = () => {
    const navegate = useNavigate();
    const nombreEmpresa = useSelector(
      (state: RootState) => state.changeSucursales.empresa
    );
    const nombreSucursal = useSelector(
      (state: RootState) => state.changeSucursales.sucursal
    );
  
    const serviceAlergeno = new ServiceAlergeno();
    const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
    const [alergenoSeleccionado, setAlergenoSeleccionado] = useState<IAlergenos | null>(null);
    const [modalCrearAlergeno, setModalCrearAlergeno] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
  
    useEffect(() => {
      serviceAlergeno
        .getAllAlergenos()
        .then((response) => {
          setAlergenos(response.data);
          console.log("Alergenos:", response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los alergenos", error);
        });
    }, []);
  
    const handleAddAlergeno = (nuevoAlergeno: IAlergenos) => {
      console.log("Nuevo alergeno agregado:", nuevoAlergeno);
      setAlergenos((prev) => [...prev, nuevoAlergeno]);
    };
  
    return (
      <div className={styles.mainDiv}>
        <div className={styles.contentHeader}>
          <h2
            onClick={() => {
              navegate(-1);
            }}
          >
            {nombreEmpresa?.nombre || "Empresa"}
          </h2>
          <div className={styles.contentSucursal}>
            <span className="point">•</span>
            <h2>{nombreSucursal?.nombre || "Sucursal"}</h2>
          </div>
        </div>
        {modal ? <VerProducto onClose={() => setModal(false)} /> : null}
  
        <button
          onClick={() => {
            setModalCrearAlergeno(true);
          }}
        >
          Agregar Alergeno
        </button>
        {modalCrearAlergeno && (
          <CrearAlergeno
            onClose={() => setModalCrearAlergeno(false)}
            onAddAlergeno={handleAddAlergeno}
            alergeno={alergenoSeleccionado}
            editar={false}
          />
        )}
  
        <div className={styles.alergenosList}>
          <h3>Alergenos</h3>
          {alergenos && alergenos.length > 0 ? (
            <ul>
              {alergenos.map((alergeno) => (
                <li key={alergeno.id}>{alergeno.denominacion}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.noAlergenos}>No hay alergenos para mostrar.</p>
          )}
        </div>
      </div>
    );
    
    return (


        <div >
            {/* Header */}

            <HeaderAdmin />

            {/* Sidebar y Body*/}

            <div className="d-flex">
                <div
                    className="sidebar p-3"
                    style={{
                        width: "20%",
                        backgroundColor: " #e9f0ec",
                        height: "100vh",
                    }}
                >
                    <SidebarAdmin />

                </div>

                <div className="flex-grow-1">
                    <BodyAdmin />
                </div>

            </div>




        </div>

    )
}

// /*    <div className="d-flex">
//     {/* Sidebar */}
//     <div
//       className="sidebar p-3"
//       style={{
//         width: "20%",
//         backgroundColor: " #e9f0ec",
//         height: "100vh",
//       }}
//     >
//       <SidebarAdmin/>
//     </div>

//     {/* Header y Body */}
//     <div className="flex-grow-1 d-flex flex-column">
//       <HeaderAdmin />
//       <div className="flex-grow-1">
//         <BodyAdmin />
//       </div>
//     </div> */
import { useState } from "react";
import { CrearEmpresa } from "../../modals/EmpresaModals/CrearEmpresa";
import { Header } from "../../components/HomeComponents/Header/Header";
import { Body } from "../../components/HomeComponents/Body/Body";
import { SidebarHome } from "../../components/HomeComponents/SidebarHome/SidebarHome";
import styles from "./Home.module.css"

/**---------------------------------------------------------------- */


export const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);

  const getEmpresas = () => {
    // Lógica para actualizar la lista de empresas
  };

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className="sidebar p-3">
          <SidebarHome onAddEmpresaClick={handleOpenModal} />
        </div>
      </div>

      {/* Contenido Principal */}
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.bodyContainer}>
          <Body />
        </div>
      </div>

      {/* Modal */}
      <CrearEmpresa
        getEmpresas={getEmpresas}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};






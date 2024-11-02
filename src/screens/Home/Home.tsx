import { useState } from "react";
import { CrearEmpresa } from "../../modals/EmpresaModals/CrearEmpresa";
import { Header } from "../../components/HomeComponents/Header/Header";
import { Body } from "../../components/HomeComponents/Body/Body";
import { SidebarHome } from "../../components/HomeComponents/SidebarHome/SidebarHome";


/**---------------------------------------------------------------- */


export const Home = () => {

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const getEmpresas = () => {
    // Lógica para actualizar la lista de empresas (agrega tu implementación aquí)
  };

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };

  return (
    <div className="d-flex">
    {/* Sidebar */}
    <div
      className="sidebar p-3"
      style={{
        width: "20%",
        backgroundColor: " #e9f0ec",
        height: "100vh",
      }}
    >
      <SidebarHome onAddEmpresaClick={handleOpenModal}/>
    </div>

    {/* Header y Body */}
    <div className="flex-grow-1 d-flex flex-column">
      <Header />
      <div className="flex-grow-1">
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

  )
}







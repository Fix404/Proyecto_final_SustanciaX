import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Header } from "../../components/Header/Header";
import { Body } from "../../components/Body/Body";


export const Home = () => {

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
      <Sidebar onAddEmpresaClick={toggleModal}/>
    </div>

    {/* Header y Body */}
    <div className="flex-grow-1 d-flex flex-column">
      <Header />
      <div className="flex-grow-1">
        <Body />
      </div>
    </div>

     {/* Modal */}
  {modalVisible && (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h2>Agregar Empresa</h2>
        <button onClick={toggleModal}>Cerrar</button>
      </div>
    </div>
  )}

  </div>

  )
}


const modalStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  
  const modalContentStyles: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
  };
  

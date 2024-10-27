<<<<<<< HEAD
import { SucursalView } from "./SucursalView/SucursalView"
import { ISucursal } from "./types/dtos/sucursal/ISucursal";

function App() {

  const unaSucursal: ISucursal = {
    id: 1,
    nombre: "Sucursal Centro",
    empresa: {
      id: 1,
      nombre: "Empresa Ejemplo",
      razonSocial: "",
      cuit: 0,
      logo: null,
      sucursales: [],
      pais: {
        nombre: "unPais",
        id: 987
      }
    },
    domicilio: {
      id: 123,
      calle: "unaCalle",
      numero: 321,
      cp: 5657,
      piso: 3, 
      eliminado: false,
      nroDpto: 113,
      localidad: {
        id: 143,
        nombre: "unaLocalidad",
        provincia: {
          nombre: "unaProvincia",
          pais: {
            nombre: "unPais",
            id: 456
          },
          id: 321
        }
      }
    },
    calle: "otraCalle",
    latitud: 19.4326,
    longitud: -99.1332,
    categorias: [], // Asumiendo que tienes un array de categorías
    esCasaMatriz: true,
    horarioApertura: "08:00",
    horarioCierre: "18:00",
    eliminado: false,
    logo: "https://example.com/logo.png" // URL del logo
};

  return (
    <>
      <SucursalView sucursal={unaSucursal} />
=======
import { Sidebar } from "./components/Sidebar/Sidebar"
import { Header } from "./components/Header/Header"
import { Body } from "./components/Body/Body"
import { useState } from "react";



function App() {

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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


 
>>>>>>> 6c13171466d4d2c23a0d2fee8c6ff8257bf57cf2
    </>
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
export default App

import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './Home/components/Header/Header';
import { Body } from './Home/components/Body/Body';
import { Sidebar } from './Home/components/Sidebar/Sidebar';

function App() {
  const dummyFunction = () => {

  }

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
          <Sidebar onAddEmpresaClick={dummyFunction} />
        </div>

        {/* Header y Body */}
        <div className="flex-grow-1 d-flex flex-column">
          <Header />
          <div className="flex-grow-1">
            <Body />
          </div>
        </div>

      </div>
    </>
  )
}

export default App




/*
import { Sidebar } from "./Home/components/Sidebar/Sidebar"
import { Header } from "./Home/components/Header/Header"
import { Body } from "./Home/components/Body/Body"
import { useState } from "react";
import { SucursalModal } from "./SucursalModal/SucursalModal";
import { ISucursal } from "./types/dtos/sucursal/ISucursal";

function App() {

const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);

  };

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
    logo: "https://example.com/logo.png" 
};

  return (
    <>
      <div className="d-flex">
        {/* Sidebar *//*}
/*        <div
          className="sidebar p-3"
          style={{
            width: "20%",
            backgroundColor: "#f4eae9",
            height: "100vh",
          }}
        >
          <Sidebar onAddEmpresaClick={toggleModal}/>
        </div>

        {/* Header y Body *//*}
/*        <div className="flex-grow-1 d-flex flex-column">
          <Header />
          <div className="flex-grow-1">
            <Body />
          </div>
        </div>

         {/* Modal *//*}
/*      {modalVisible && <SucursalModal sucursal={unaSucursal} />}
      </div>
    </>

}
export default App
  )*/
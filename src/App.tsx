import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './Home/components/Header/Header';
import { Body } from './Home/components/Body/Body';
import { Sidebar } from './Home/components/Sidebar/Sidebar';
import { useState } from 'react';
import { CrearEmpresa } from './views/Modals/CrearEmpresa/CrearEmpresa'; // Importa CrearEmpresa

function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const getEmpresas = () => {
    // Lógica para actualizar la lista de empresas (agrega tu implementación aquí)
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
          <Sidebar onAddEmpresaClick={handleOpenModal} /> {/* Pasa handleOpenModal */}
        </div>

        {/* Header y Body */}
        <div className="flex-grow-1 d-flex flex-column">
          <Header />
          <Body />
        </div>

        {/* Modal Crear Empresa */}
        <CrearEmpresa
          getEmpresas={getEmpresas}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </div>
    </>
  );
}

export default App;
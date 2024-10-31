/*import { Route, Routes } from "react-router-dom"
import { CrearSucursal } from "../views/Modals/CrearSucursal/CrearSucursal"
import { useEffect, useState } from "react";
import { SucursalService } from "../services/ParticularServices/SucursalService";
import { useAppDispatch } from "../hooks/redux";
import { setDataTable } from "../redux/slices/TableReducer";
const API_URL=import.meta.env.VITE_API_URL;


export const AppRouter = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
    <Routes>
        {/* Ruta para la pantalla de personas 
        <Route path="/" element={<CrearSucursal getSucursales={getSucursales}
        openModal={openModal}
        setOpenModal={setOpenModal} />} />
      </Routes>
  )
} */

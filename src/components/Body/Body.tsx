import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setDataTable } from "../../redux/slices/TableReducer";
import { SucursalService } from "../../services/ParticularServices/SucursalService";
import { ListSucursales } from "../../ui/ListSucursales/ListSucursales"
import styles from "./Body.module.css"
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";

const API_URL = import.meta.env.VITE_API_URL;

export const Body = () => {
  const [sucursales, setSucursales] = useState<ISucursal[]>([]);
  const sucursalService = new SucursalService(API_URL + "/sucursales");
  const dispatch = useAppDispatch();

  const getSucursales = async () => {
    await sucursalService.getAll().then((sucursalData) => {
      setSucursales(sucursalData);
      dispatch(setDataTable(sucursalData));
    });
  };

  useEffect(() => {
    getSucursales();
  }, []);

  

  return (
    <div className={styles.containerGeneralBody}>
        <ListSucursales sucursales={sucursales} />
    </div>
  )
}

import { ListSucursales } from "../../../ui/ListSucursales/ListSucursales"
import styles from "./Body.module.css"
import { useEffect} from "react";
import { SucursalService } from "../../../services/ParticularServices/SucursalService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setDataSucursalList } from "../../../redux/slices/TableReducerSucursal";

const API_URL = import.meta.env.VITE_API_URL;

export const Body = () => {
  const sucursalService = new SucursalService(API_URL + "sucursales/porEmpresa/1");
  const dispatch = useAppDispatch();

  const getSucursales = async () => {
    await sucursalService.getAll().then((sucursalData) => {
      dispatch(setDataSucursalList(sucursalData));
    });
  };

  const dataList=useAppSelector((state) => state.tablaReducerSucursal.dataList);
  const empresaActiva=useAppSelector((state) => state.empresaReducer.elementActive);

  useEffect(() => {
    getSucursales();
  }, []);

  return (
    <>
    {empresaActiva ?  <div className={styles.containerGeneralBody}>
    <ListSucursales sucursales={dataList} />
</div> : <div>
  <h1>No se ha seleccionado una empresa</h1>
  </div>}
</>
  )
}

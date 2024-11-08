import { ListSucursales } from "../../../ui/ListSucursales/ListSucursales"
import styles from "./Body.module.css"
import { useEffect } from "react";
import { SucursalService } from "../../../services/ParticularServices/SucursalService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setDataSucursalList } from "../../../redux/slices/TableReducerSucursal";

const API_URL = import.meta.env.VITE_API_URL;

export const Body = () => {
  const dispatch = useAppDispatch();
  const empresaActiva=useAppSelector((state) => state.empresaReducer.elementActive);

  const sucursalService = new SucursalService(API_URL + `sucursales/`);

  const getSucursalesPorEmpresaId = async (id:number) => {
    await sucursalService.getSucursalesPorEmpresaId(id).then((sucursalData) => {
      dispatch(setDataSucursalList(sucursalData));
    });
  };

  const dataList=useAppSelector((state) => state.tablaReducerSucursal.dataList);
  

  useEffect(() => {
    if(empresaActiva && empresaActiva.id){
      getSucursalesPorEmpresaId(empresaActiva.id);
    }
  }, [empresaActiva]);

  return (
    <>
    <div className={styles.containerGeneralBody}>
      {empresaActiva ?  <div>
      <ListSucursales sucursales={dataList} />
      </div> : <div className={styles.containerNoSelection}>
      <p>No se ha seleccionado ninguna empresa</p>
        </div>}
    </div>
</>
  )
}

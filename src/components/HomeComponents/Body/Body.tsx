import { ListSucursales } from "../../../ui/ListSucursales/ListSucursales"
import styles from "./Body.module.css"
import { useEffect } from "react";
import { SucursalService } from "../../../services/ParticularServices/SucursalService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setDataSucursalList } from "../../../redux/slices/TableReducerSucursal";



export const Body = () => {
  const dispatch = useAppDispatch();
  const empresaActiva=useAppSelector((state) => state.empresaReducer.elementActive);

  const sucursalService = new SucursalService(`/api/`);

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
    {empresaActiva ?  <div className={styles.containerGeneralBody}>
    <ListSucursales sucursales={dataList} />
</div> : <div>
  </div>}
</>
  )
}

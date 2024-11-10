import { ListSucursales } from "../../../ui/ListSucursales/ListSucursales";
import styles from "./Body.module.css"
import { useEffect } from "react";
import { SucursalService } from "../../../services/ParticularServices/SucursalService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setDataSucursalList } from "../../../redux/slices/SucursalReducer";



export const Body = () => {
  const dispatch = useAppDispatch();
  const empresaActiva=useAppSelector((state) => state.empresaReducer.empresaActiva);

  const sucursalService = new SucursalService(`/api/`);

  const getSucursalesPorEmpresaId = async (id:number) => {
    await sucursalService.getSucursalesPorEmpresaId(id).then((sucursalData) => {
      dispatch(setDataSucursalList(sucursalData));
    });
  };

  const dataList=useAppSelector((state) => state.sucursalReducer.sucursalList);
  

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

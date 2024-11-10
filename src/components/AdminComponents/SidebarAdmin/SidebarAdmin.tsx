import { Button } from "react-bootstrap"
import styles from './SidebarAdmin.module.css'
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { useEffect } from "react";
import { setEmpresaActiva } from "../../../redux/slices/EmpresasReducer";
import { setSucursalActiva } from "../../../redux/slices/SucursalReducer";

interface SidebarAdminProps {
  onButtonClick: (buttonName: string) => void; 
}

export const SidebarAdmin: React.FC<SidebarAdminProps> = ({onButtonClick}) => {

  const empresaActiva=useAppSelector((state) => state.empresaReducer.empresaActiva)!;
  const sucursalActiva=useAppSelector((state) => state.sucursalReducer.sucursalActiva)!;
  const dispatch=useAppDispatch();

  useEffect(() => {
    if(empresaActiva && sucursalActiva){
      dispatch(setEmpresaActiva({element:empresaActiva}));
    dispatch(setSucursalActiva({element:sucursalActiva}));
    }
  }, [dispatch, empresaActiva, sucursalActiva]);

  return (
    <div className={styles.principalContainerSideBarAdmin}>

    <div>
      <h1>{empresaActiva?.nombre} - Sucursal: {sucursalActiva?.nombre}</h1>
    </div>

    <div className={styles.containerDivButtonEmpresa} >
        <Button variant="outline-success" onClick={() => onButtonClick("CATEGORIAS")}>CATEGORIAS</Button>
        <Button variant="outline-success" onClick={() => onButtonClick("PRODUCTOS")}>PRODUCTOS</Button>
        <Button variant="outline-success" onClick={() => onButtonClick("ALERGENOS")}>ALERGENOS</Button>
    </div>

  </div>
  )
}

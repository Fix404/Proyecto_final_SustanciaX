import { Button } from "react-bootstrap"
import styles from './SidebarAdmin.module.css'
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { useEffect, useState } from "react";
import { setEmpresaActiva } from "../../../redux/slices/EmpresasReducer";
import { setSucursalActiva } from "../../../redux/slices/SucursalReducer";

interface SidebarAdminProps {
  onButtonClick: (buttonName: string) => void; 
}

export const SidebarAdmin: React.FC<SidebarAdminProps> = ({onButtonClick}) => {

  const [botonSidebarActivo, setBotonSidebarActivo] = useState<string>(""); 

  const empresaActiva=useAppSelector((state) => state.empresaReducer.empresaActiva)!;
  const sucursalActiva=useAppSelector((state) => state.sucursalReducer.sucursalActiva)!;
  const dispatch=useAppDispatch();

  useEffect(() => {
    if(empresaActiva && sucursalActiva){
      dispatch(setEmpresaActiva({element:empresaActiva}));
    dispatch(setSucursalActiva({element:sucursalActiva}));
    }
    setBotonSidebarActivo("CATEGORIAS");
  }, [dispatch, empresaActiva, sucursalActiva]);

  return (
    <div className={styles.principalContainerSideBarAdmin}>

    <div className={styles.headerSidebar}>
      <h1>{empresaActiva?.nombre}</h1>
      <div className={styles.sucursalSidebar}>
        <h1>Sucursal</h1>
        <p> {sucursalActiva?.nombre}</p>
      </div>
    </div>

    <div className={styles.containerDivButtonEmpresa} >
        <Button
        variant={botonSidebarActivo === "CATEGORIAS" ? "success" : "outline-success"} // Cambia el estilo según el botón activo
        onClick={() => {
          setBotonSidebarActivo("CATEGORIAS");
          onButtonClick("CATEGORIAS");
        }}
        >CATEGORIAS</Button>
        <Button 
       variant={botonSidebarActivo === "PRODUCTOS" ? "success" : "outline-success"} // Cambia el estilo según el botón activo
       onClick={() => {
         setBotonSidebarActivo("PRODUCTOS");
         onButtonClick("PRODUCTOS");
       }}
        >PRODUCTOS</Button>
        <Button
        variant={botonSidebarActivo === "ALERGENOS" ? "success" : "outline-success"} // Cambia el estilo según el botón activo
        onClick={() => {
          setBotonSidebarActivo("ALERGENOS");
          onButtonClick("ALERGENOS");
        }}
        >ALERGENOS</Button>
    </div>

  </div>
  )
}

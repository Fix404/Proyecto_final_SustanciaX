import { Container, Nav } from "react-bootstrap"
import styles from "./HeaderAdmin.module.css"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { useEffect } from "react";
import { setEmpresaActiva } from "../../../redux/slices/EmpresasReducer";
import { setSucursalActiva } from "../../../redux/slices/SucursalReducer";

export const HeaderAdmin = () => {
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
    <Nav className={styles.containerNav}>
    
      <div>
        <Nav.Link href="/" >
          <span className="material-symbols-rounded">
            <div className={styles.containerIcon}>keyboard_backspace</div>
          </span>
        </Nav.Link>
      </div>
      <div>
      <p className={styles.containerSucursal}>Volver a Empresas</p>
      </div>
 
    </Nav>
  )
}

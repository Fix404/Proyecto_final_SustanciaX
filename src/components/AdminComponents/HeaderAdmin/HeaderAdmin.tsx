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
      <Container className={styles.containerNav}>
      <Nav.Item className={styles.containerNav}>
        <Nav.Link href="/" >
          <span className="material-symbols-rounded">
            <div className={styles.containerIcon}>keyboard_backspace</div>
          </span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className={styles.containerNav}>
      <p className={styles.containerSucursal}>{empresaActiva?.nombre} - Sucursal: {sucursalActiva?.nombre}</p>
      </Nav.Item>
      </Container>
    </Nav>
  )
}

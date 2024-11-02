import { Button } from "react-bootstrap"
import styles from './SidebarAdmin.module.css'

// interface SidebarAdminProps {
//     onClickProductos: () => void; 
//     onClickAlergenos: () => void;
//     onClickCategorias: () => void;
//   }

export const SidebarAdmin = () => {
  return (
    <div >

    <div className={styles.containerTitle}>
      <p>Administración</p>
    </div>

    <div className={styles.containerDivButtonEmpresa} >
        <Button variant="outline-success" >CATEGORIAS</Button>
        <Button variant="outline-success" >PRODUCTOS</Button>
        <Button variant="outline-success" >ALERGENOS</Button>
    </div>

  </div>
  )
}

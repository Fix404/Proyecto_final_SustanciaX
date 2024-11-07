import { Button } from "react-bootstrap"
import styles from './SidebarAdmin.module.css'

interface SidebarAdminProps {
  onButtonClick: (buttonName: string) => void; 
}

export const SidebarAdmin: React.FC<SidebarAdminProps> = ({onButtonClick}) => {
  return (
    <div >

    <div className={styles.containerTitle}>
      <p>Administración</p>
    </div>

    <div className={styles.containerDivButtonEmpresa} >
        <Button variant="outline-success" onClick={() => onButtonClick("CATEGORIAS")}>CATEGORIAS</Button>
        <Button variant="outline-success" onClick={() => onButtonClick("PRODUCTOS")}>PRODUCTOS</Button>
        <Button variant="outline-success" onClick={() => onButtonClick("ALERGENOS")}>ALERGENOS</Button>
    </div>

  </div>
  )
}

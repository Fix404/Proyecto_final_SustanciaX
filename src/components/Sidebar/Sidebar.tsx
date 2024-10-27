

import styles from './Sidebar.module.css'

interface SidebarProps {
  onAddEmpresaClick: () => void; // Especifica que onAddEmpresaClick es una función sin argumentos que no retorna nada
}


export const Sidebar: React.FC<SidebarProps> = ({ onAddEmpresaClick}) => {


  
  return (
    <div >

      <div className={styles.containerTitle}>
        <p>Empresas</p>
      </div>
      <div className={styles.containerDivButtonEmpresa} >
        <button className={styles.containerButton} onClick={onAddEmpresaClick}>AGREGAR EMPRESA</button>

      </div>
    </div>
  )
}

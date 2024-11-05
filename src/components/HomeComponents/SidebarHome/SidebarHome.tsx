import { empresaData } from '../../../data/empresasEjemplo';
import { ListEmpresas } from '../../../ui/ListEmpresas/ListEmpresas';
import { Button} from 'react-bootstrap';
import styles from './SidebarHome.module.css'

interface SidebarHomeProps {
  onAddEmpresaClick: () => void; // Especifica que onAddEmpresaClick es una función sin argumentos que no retorna nada
}


export const SidebarHome: React.FC<SidebarHomeProps> = ({ onAddEmpresaClick }) => {



  return (
    <div >

      <div className={styles.containerTitle}>
      <ListEmpresas empresas={empresaData}/>
      </div>

      <div className={styles.containerDivButtonEmpresa} >
          <Button variant="outline-success" onClick={onAddEmpresaClick}>AGREGAR EMPRESA</Button>
      </div>

    </div>
  )
}

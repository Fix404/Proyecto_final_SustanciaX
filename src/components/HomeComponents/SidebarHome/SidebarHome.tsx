import { ListEmpresas } from '../../../ui/ListEmpresas/ListEmpresas';
import { Button} from 'react-bootstrap';
import styles from './SidebarHome.module.css'
import { useDispatch } from 'react-redux';
import { EmpresaService } from '../../../services/ParticularServices/EmpresaService';
import { setDataEmpresaList } from '../../../redux/slices/EmpresasReducer';
import { useEffect } from 'react';
import { useAppSelector } from '../../../hooks/redux';

const API_URL=import.meta.env.VITE_API_URL;

export interface IPropsSidebarHome {
  onAddEmpresaClick: () => void; // Especifica que onAddEmpresaClick es una función sin argumentos que no retorna nada
}


export const SidebarHome: React.FC<IPropsSidebarHome> = ({ onAddEmpresaClick }) => {
  const empresaService=new EmpresaService(`/api/empresas`);
  const dispatch=useDispatch();

  const getEmpresas=async () => {
    await empresaService.getAll().then((empresasData)=>{
      dispatch(setDataEmpresaList(empresasData));
    });
  }

  const empresas=useAppSelector((state)=> state.empresaReducer.dataList);

  useEffect(()=>{
    getEmpresas();
  }, [])


  return (
    <div className={styles.principalContainerSidebar}>
      <div>
        <h1>Empresas</h1>
      </div>
      <div className={styles.containerDivButtonEmpresa} >
          <Button variant="outline-success" onClick={onAddEmpresaClick}>AGREGAR EMPRESA</Button>
      </div>

      <div>
        <ListEmpresas empresas={empresas}/>
      </div>

    </div>
  )
}


import { Button} from 'react-bootstrap';
import styles from './Sidebar.module.css'
import { ListEmpresas } from '../../ui/ListEmpresas/ListEmpresas';
import { useDispatch } from 'react-redux';
import { EmpresaService } from '../../services/ParticularServices/EmpresaService';
import { setDataEmpresaList } from '../../redux/slices/EmpresasReducer';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';

const API_URL = "http://190.221.207.224:8090/";

// const API_URL=import.meta.env.VITE_API_URL;



interface SidebarProps {
  onAddEmpresaClick: () => void; // Especifica que onAddEmpresaClick es una función sin argumentos que no retorna nada
}


export const Sidebar: React.FC<SidebarProps> = ({ onAddEmpresaClick }) => {
  const empresaService=new EmpresaService(API_URL+`empresas`);
  const dispatch=useDispatch();

  const getEmpresas=async () => {
    await empresaService.getAll().then((empresasData)=>{
      dispatch(setDataEmpresaList(empresasData));
    });
  }

  const empresas=useAppSelector((state)=> state.empresaReducer.dataList);

  useEffect(()=>{
    getEmpresas();
  })


  return (
    <div >

      <div className={styles.containerTitle}>
        <p>Empresas</p>
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

import { Button, Card } from "react-bootstrap"
import { ISucursal } from "../../types/dtos/sucursal/ISucursal"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./CardSucursal.module.css"
import { EditarSucursal } from "../../modals/SucursalModals/EditarSucursal"
import { SucursalService } from "../../services/ParticularServices/SucursalService"
import { useAppDispatch } from "../../hooks/redux"
import { setDataTable } from "../../redux/slices/TableReducer"
import { VerSucursal } from "../../modals/SucursalModals/VerSucursal"

const API_URL=import.meta.env.VITE_API_URL;
interface ICardSucursal{
    sucursal:ISucursal
}

export const CardSucursal:FC<ICardSucursal> = ({sucursal}) => {

    const navigate=useNavigate();

    const handleNavigateAdmin= () => {
        navigate("/admin/");
    }

    const [loading, setLoading] = useState(false);
    const [openModalEditar, setOpenModalEditar] = useState(false);
    const [openModalVer, setOpenModalVer] = useState(false); 

    const toggleModalEditar = () => {
      setOpenModalEditar(!openModalEditar);
    };
    const toggleModalVer = () => { 
      setOpenModalVer(!openModalVer);
    }

    const sucursalService = new SucursalService(API_URL + "/sucursales");
    const dispatch = useAppDispatch();
  
    const getSucursales = async () => {
      await sucursalService.getAll().then((sucursalData) => {
        dispatch(setDataTable(sucursalData));
        setLoading(false);
      });
    };
  
    useEffect(() => {
      setLoading(true);
      getSucursales();
    }, []);

  return (
    <div>
          <Card className={styles.card} >
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{sucursal.nombre}</Card.Title>
              <Card.Text>
                <p>Horario de apertura: {sucursal.horarioApertura}</p>
                <p>Horario de cierre: {sucursal.horarioCierre}</p>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="warning" onClick={handleNavigateAdmin}>Admin</Button>
                {openModalVer && <VerSucursal sucursal={sucursal} />}
                <Button variant="primary" onClick={toggleModalVer}>Ver</Button>
                {openModalEditar && <EditarSucursal getSucursales={getSucursales} openModal={openModalEditar} setOpenModal={setOpenModalEditar}/>}
                <Button variant="secondary" onClick={toggleModalEditar}>Editar</Button>
                
            </Card.Footer>
          </Card>
    </div>
  )
}


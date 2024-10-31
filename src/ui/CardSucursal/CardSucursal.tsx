import { Button, Card } from "react-bootstrap"
import { ISucursal } from "../../types/dtos/sucursal/ISucursal"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./CardSucursal.module.css"

interface ICardSucursal{
    sucursal:ISucursal
}


export const CardSucursal:FC<ICardSucursal> = ({sucursal}) => {
    const navigate=useNavigate();
    const handleNavigateSucursal= () => {
        navigate(`/sucursales/${sucursal.id}`);
    }
  return (
    <div>
          <Card className={styles.card} onClick={handleNavigateSucursal}>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{sucursal.nombre}</Card.Title>
              <Card.Text>
                <p>Horario de apertura: {sucursal.horarioApertura}</p>
                <p>Horario de cierre: {sucursal.horarioCierre}</p>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary">Ver</Button>
                <Button variant="secondary">Editar</Button>
                <Button variant="danger">Eliminar</Button>
            </Card.Footer>
          </Card>
    </div>
  )
}

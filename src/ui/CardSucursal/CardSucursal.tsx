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

    const handleNavigateAdmin= () => {
        navigate("/admin/");
    }

  return (
    <div>
          <Card className={styles.card} >
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{sucursal.nombre}</Card.Title>
              <Card.Text>
                Horario de apertura: {sucursal.horarioApertura}
                <br></br>
                Horario de cierre: {sucursal.horarioCierre}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="warning" onClick={handleNavigateAdmin}>Admin</Button>
                <Button variant="primary">Ver</Button>
                <Button variant="secondary">Editar</Button>
<<<<<<< HEAD
                
=======
>>>>>>> ramanegra
            </Card.Footer>
          </Card>
    </div>
  )
}

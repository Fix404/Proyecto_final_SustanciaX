import { Button, Card } from "react-bootstrap"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./CardSucursal.module.css"
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa"

interface ICardEmpresa{
    empresa:IEmpresa
}


export const CardEmpresa:FC<ICardEmpresa> = ({empresa}) => {

    const navigate=useNavigate();

    const handleNavigateEmpresaSucursales= () => {
        navigate("/empresa-sucursales/");
    }

    const handleNavigateVerEmpresa= () => {
        navigate("/ver-empresa/");
    }

    const handleNavigateEditarEmpresa= () => {
        navigate("/editar-empresa/");
    }

  return (
    <div>
          <Card className={styles.cardEmpresa} onClick={handleNavigateEmpresaSucursales}>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{empresa.nombre}</Card.Title>
              <Card.Text>
              <Button variant="primary" onClick={handleNavigateVerEmpresa}>Ver</Button>
              <Button variant="secondary" onClick={handleNavigateEditarEmpresa}>Editar</Button>
              </Card.Text>
            </Card.Body>
          </Card>
    </div>
  )
}



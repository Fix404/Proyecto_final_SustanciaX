import { Button, Card } from "react-bootstrap"
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa"
import { FC } from "react"

interface ICardEmpresa{
    empresa:IEmpresa
}


export const CardEmpresa:FC<ICardEmpresa> = ({empresa}) => {
  return (
    <div>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{empresa.nombre}</Card.Title>
        <Card.Text>
          {empresa.cuit}
          {empresa.razonSocial}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

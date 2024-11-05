import { Card } from "react-bootstrap"
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa"
import { FC } from "react"
import { useAppDispatch} from "../../hooks/redux"
import { removeEmpresaElementActive, setEmpresaElementActive } from "../../redux/slices/EmpresasReducer"

interface ICardEmpresa{
    empresa:IEmpresa
}


export const CardEmpresa:FC<ICardEmpresa> = ({empresa}) => {
  const dispatch=useAppDispatch();
  const handleEmpresaActiva=()=>{
    dispatch(removeEmpresaElementActive())
    dispatch(setEmpresaElementActive({element:empresa}))
  }
  return (
    <>
    {empresa && <div>
      <Card style={{ width: '12rem' }} onClick={handleEmpresaActiva}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>{empresa.nombre}</Card.Title>
      <Card.Text>
        {empresa.cuit}
        {empresa.razonSocial}
      </Card.Text>
    </Card.Body>
  </Card>
  </div>}
    </>
  )
}

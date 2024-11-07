import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CardSucursal.module.css";
import { useAppDispatch } from "../../hooks/redux";
import { removeElementActive, setElementActive } from "../../redux/slices/TableReducerSucursal";
import { CrearSucursal } from "../../modals/SucursalModals/CrearSucursal";

interface ICardSucursal {
  sucursal: ISucursal;
}

export const CardSucursal: FC<ICardSucursal> = ({ sucursal }) => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch=useAppDispatch();
  const navigate = useNavigate();

  const handleNavigateAdmin = () => {
    navigate("/admin");
  };

  const handleEditarSucursal = () => {
    dispatch(removeElementActive());
    dispatch(setElementActive({element:sucursal}));
    setOpenModal(!openModal)
  }

  return (
    <div>
      <Card className={styles.card}>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>{sucursal.nombre}</Card.Title>
          <Card.Text>
            Horario de apertura: {sucursal.horarioApertura}
            <br></br>
            Horario de cierre: {sucursal.horarioCierre}
          </Card.Text>
        </Card.Body>
        <Card.Footer className={styles.cardSucursalFooterContainer}>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-admin">Administrar Sucursal</Tooltip>
            }
          >
            <Button variant="warning" onClick={handleNavigateAdmin}>
              <span className="material-symbols-outlined">apartment</span>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger  placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-ver">Ver Sucursal</Tooltip>
            }>
          <Button variant="primary">
            <span className="material-symbols-outlined">table_eye</span>
          </Button>
          </OverlayTrigger>
          <OverlayTrigger  placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-eliminar">Editar Sucursal</Tooltip>
            }>
          <Button variant="secondary" onClick={handleEditarSucursal}>
            <span className="material-symbols-outlined">edit</span>
          </Button>
          </OverlayTrigger>
        </Card.Footer>
      </Card>

      {openModal && <CrearSucursal openModal={openModal} setOpenModal={setOpenModal}/>}
    </div>
  );
};

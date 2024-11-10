import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CardSucursal.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeElementActive, setElementActive } from "../../redux/slices/TableReducerSucursal";
import { EditarSucursal } from "../../modals/SucursalModals/EditarSucursal";
import { VerSucursal } from "../../modals/SucursalModals/VerSucursal";

interface ICardSucursal {
  sucursal: ISucursal;
}

export const CardSucursal: FC<ICardSucursal> = ({ sucursal }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openVerModal, setOpenVerModal] = useState(false);

  const dispatch=useAppDispatch();
  const navigate = useNavigate();

  const handleNavigateAdmin = () => {
    navigate("/admin");
  };

  const sucursalActiva=useAppSelector(state => state.tablaReducerSucursal.elementActive);
  const handleEditarSucursal = () => {
    dispatch(removeElementActive());
    dispatch(setElementActive({element:sucursal}));
    setOpenModal(!openModal)
  }

  const handleVerSucursal = () => {
    setOpenVerModal(!openVerModal); 
  };

  useEffect(() =>{
  }, [sucursalActiva])

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
          <Button variant="primary" onClick={handleVerSucursal}>
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

      {openModal && sucursalActiva && <EditarSucursal openModal={openModal} setOpenModal={setOpenModal} sucursalActiva={sucursalActiva}/>}
      {openVerModal && <VerSucursal sucursal={sucursal} />}
    </div>
  );
};

import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CardSucursal.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeSucursalActiva, setSucursalActiva } from "../../redux/slices/SucursalReducer";
import { EditarSucursal } from "../../modals/SucursalModals/EditarSucursal";
import { VerSucursal } from "../../modals/SucursalModals/VerSucursal";

interface ICardSucursal {
  sucursal: ISucursal;
}

export const CardSucursal: FC<ICardSucursal> = ({ sucursal }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openVerModal, setOpenVerModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigateAdmin = () => {
    dispatch(removeSucursalActiva());
    dispatch(setSucursalActiva({ element: sucursal }));
    navigate("admin");
  };

  const sucursalActiva = useAppSelector(state => state.sucursalReducer.sucursalActiva);
  const handleEditarSucursal = () => {
    dispatch(removeSucursalActiva());
    dispatch(setSucursalActiva({ element: sucursal }));
    setOpenModal(!openModal)
  }

  const handleVerSucursal = () => {
    setOpenVerModal(!openVerModal); 
  };

  return (
    <div className={styles.divPrincipal}>
      <Card className={styles.containerCardSucursal} >

        <Card.Header className={styles.containerCardHeader}>
          <Card.Title>{sucursal.nombre}</Card.Title>
          <Card.Text>
            {sucursal.horarioApertura} - {sucursal.horarioCierre}
          </Card.Text>
        </Card.Header>

        <Card.Body className={styles.containerCardBody}>
          <div ><Card.Img className={styles.containerImage} src="holder.js/100px160" /></div>
        </Card.Body>


        <Card.Footer className={styles.cardSucursalFooterContainer}>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-admin">Admin</Tooltip>
            }
          >
            <Button variant="custom" className={styles.botonSucursalHome} onClick={handleNavigateAdmin}>
              <span className="material-symbols-outlined">apartment</span>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-ver">Ver</Tooltip>
            }>
          <Button  variant="custom" className={styles.botonSucursalHome} onClick={handleVerSucursal}>
            <span className="material-symbols-outlined">table_eye</span>
          </Button>
          </OverlayTrigger>

          <OverlayTrigger placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-eliminar">Editar</Tooltip>
            }>
            <Button variant="custom" className={styles.botonSucursalHome} onClick={handleEditarSucursal}>
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

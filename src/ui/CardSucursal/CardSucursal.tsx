import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CardSucursal.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeSucursalActiva, setDataSucursalList, setSucursalActiva } from "../../redux/slices/SucursalReducer";
import { EditarSucursal } from "../../modals/SucursalModals/EditarSucursal";
import { VerSucursal } from "../../modals/SucursalModals/VerSucursal";
import { SucursalService } from "../../services/ParticularServices/SucursalService";

interface ICardSucursal {
  sucursal: ISucursal;
}

export const CardSucursal: FC<ICardSucursal> = ({ sucursal }) => {
  const [openVerModal, setOpenVerModal] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const sucursalService = new SucursalService("/api/");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const empresaActiva = useAppSelector((state) => state.empresaReducer.empresaActiva)!;

  const handleNavigateAdmin = () => {
    dispatch(removeSucursalActiva());
    dispatch(setSucursalActiva({ element: sucursal }));
    navigate("admin");
  };

  const handleEditarSucursal = () => {
    setOpenModalEditar(!openModalEditar);
  };

  const handleVerSucursal = () => {
    setOpenVerModal(!openVerModal);
  };

  const getSucursales = async (id: number) => {
    await sucursalService.getSucursalesPorEmpresaId(id).then((sucursalData) => {
      dispatch(setDataSucursalList(sucursalData));
    });
  };

  useEffect(() => {}, [openModalEditar, openVerModal]);

  return (
    <div className={styles.divPrincipal}>
      <Card className={styles.containerCardSucursal}>
        <Card.Header className={styles.containerCardHeader}>
          <Card.Title>{sucursal?.nombre}</Card.Title>
          <Card.Text>
            {sucursal?.horarioApertura} - {sucursal?.horarioCierre}
          </Card.Text>
        </Card.Header>

        <Card.Body className={styles.containerCardBody}>
          {/* Verificar si la sucursal tiene un logo */}
          {sucursal?.logo ? (
            <Card.Img
              className={styles.containerImage}
              src={sucursal.logo} // Mostrar el logo de la sucursal
              alt={`Logo de ${sucursal.nombre}`}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          ) : (
            <div>No hay logo disponible</div>
          )}
        </Card.Body>

        <Card.Footer className={styles.cardSucursalFooterContainer}>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip-admin">Admin</Tooltip>}
          >
            <Button variant="custom" className={styles.botonSucursalHome} onClick={handleNavigateAdmin}>
              <span className="material-symbols-outlined">apartment</span>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip-ver">Ver</Tooltip>}
          >
            <Button variant="custom" className={styles.botonSucursalHome} onClick={handleVerSucursal}>
              <span className="material-symbols-outlined">table_eye</span>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip-eliminar">Editar</Tooltip>}
          >
            <Button variant="custom" className={styles.botonSucursalHome} onClick={handleEditarSucursal}>
              <span className="material-symbols-outlined">edit</span>
            </Button>
          </OverlayTrigger>
        </Card.Footer>
      </Card>

      {openModalEditar && (
        <EditarSucursal
          openModal={openModalEditar}
          setOpenModal={setOpenModalEditar}
          getSucursales={() => getSucursales(empresaActiva.id)}
          sucursal={sucursal}
        />
      )}
      {openVerModal && <VerSucursal openModal={openVerModal} setOpenModal={setOpenVerModal} sucursal={sucursal} />}
    </div>
  );
};
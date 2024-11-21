import { FC } from "react";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import styles from "./SucursalModal.module.css";
import { Button, Modal } from "react-bootstrap";

interface SucursalModalProps {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  sucursal: ISucursal;
}

export const VerSucursal: FC<SucursalModalProps> = ({
  openModal,
  setOpenModal,
  sucursal,
}) => {
  const onClose = () => {
    setOpenModal(!openModal);
  };

  return (
    <Modal
      show={openModal}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
      id="modal"
    >
      <div className={styles.modalContainerSucursal}>
        <Modal.Header>
          <Modal.Title>Sucursal</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.containerBodySucursal}>
          <p><b>Nombre: </b>{sucursal?.nombre}</p>
          <p><b>Empresa: </b>{sucursal?.empresa.nombre}</p>
          <p><b>Horario apertura: </b>{sucursal?.horarioApertura}</p>
          <p><b>Horario cierre: </b>{sucursal?.horarioCierre}</p>
          <p><b>País: </b>{sucursal?.domicilio.localidad.provincia.pais.nombre}</p>
          <p><b>Provincia: </b>{sucursal?.domicilio.localidad.provincia.nombre}</p>
          <p><b>Localidad: </b>{sucursal?.domicilio.localidad.nombre}</p>
          <p><b>Calle: </b>{sucursal?.domicilio.calle}</p>
          <p><b>Número: </b>{sucursal?.domicilio.numero}</p>
          <p><b>Es casa matriz: </b>{sucursal?.esCasaMatriz ? <p>Sí</p> : <p>No</p>}</p>
          
          <p><b>Logo:</b></p>
          {sucursal?.logo ? (
            <img
              src={sucursal.logo} // Asegúrate de que 'logo' sea una URL válida
              alt="Logo de la sucursal"
              style={{
                width: "150px",
                height: "auto",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            />
          ) : (
            <p>No se ha cargado un logo.</p>
          )}
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button variant="custom" className={styles.modalBoton} onClick={onClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};
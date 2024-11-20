import { FC } from "react";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import styles from "./SucursalModal.module.css";
import { Modal } from "react-bootstrap";
interface SucursalModalProps {
  openModal: boolean,
  setOpenModal: (state: boolean) => void,
  sucursal: ISucursal
}

export const VerSucursal: FC<SucursalModalProps> = ({
  openModal,
  setOpenModal,
  sucursal
}) => {
    console.log(sucursal);
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
    <Modal.Header closeButton>
      <Modal.Title>Sucursal</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p><b>Nombre: </b>{sucursal?.nombre}</p>
      <p><b>Empresa: </b>{sucursal?.empresa.nombre}</p>
      <p><b>Horario apertura: </b>{sucursal?.horarioApertura}</p>
      <p><b>Horario cierre: </b>{sucursal?.horarioCierre}</p>
      <p><b>País: </b>{sucursal?.domicilio.localidad.provincia.pais.nombre}</p>
      <p><b>Provincia: </b>{sucursal?.domicilio.localidad.provincia.nombre}</p>
      <p><b>Localidad: </b>{sucursal?.domicilio.localidad.nombre}</p>
      <p><b>Calle: </b>{sucursal?.domicilio.calle}</p>
      <p><b>Número: </b>{sucursal?.domicilio.numero}</p>
      <p><b>Es casa matriz: </b></p>{sucursal?.esCasaMatriz ? <p>Sí</p> : <p>No</p>}
      <p><b>Logo:</b> {sucursal?.logo}</p>
    </Modal.Body>
    <Modal.Footer>
      <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
    </Modal.Footer>
  </Modal>
  );
};

import styles from "./EmpresaModal.module.css"
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import { Modal } from "react-bootstrap";

interface EmpresaModalProps {
    empresa: IEmpresa,
    openModal:boolean,
    setOpenModal: (state: boolean) => void
}

export const VerEmpresa: React.FC<EmpresaModalProps> = ({ empresa, openModal, setOpenModal }) => {

    const { nombre, razonSocial, cuit, logo } = empresa;

    const onClose = () => {
        setOpenModal(!openModal);
    }

    return (
        <>
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
    <Modal.Title>Empresa</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p><b>Nombre:</b> {nombre}</p>
    <p><b>Razón Social:</b> {razonSocial}</p>
    <p><b>CUIT:</b> {cuit}</p>
    <p><b>Logo:</b> {logo}</p>
  </Modal.Body>
  <Modal.Footer>
    <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
  </Modal.Footer>
</Modal>
        </>
    );
}
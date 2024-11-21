import styles from "./EmpresaModal.module.css";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import { Button, Modal } from "react-bootstrap";

interface EmpresaModalProps {
  empresa: IEmpresa;
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

export const VerEmpresa: React.FC<EmpresaModalProps> = ({ empresa, openModal, setOpenModal }) => {
  const { nombre, razonSocial, cuit, logo } = empresa;

  const onClose = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <Modal
        show={openModal}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered
        id="modal"
      >
        <div className={styles.modalContainer}>
          <Modal.Header>
            <Modal.Title>Empresa</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.containerBody}>
            <p><b>Nombre:</b> {nombre}</p>
            <p><b>Razón Social:</b> {razonSocial}</p>
            <p><b>CUIT:</b> {cuit}</p>
            <p><b>Logo:</b></p>
            {logo ? (
              <img
                src={logo} // Asegúrate de que 'logo' sea una URL válida
                alt="Logo de la empresa"
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
              Cancelar
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};
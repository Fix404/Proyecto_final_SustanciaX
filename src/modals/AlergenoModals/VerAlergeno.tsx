import styles from "./AlergenoModal.module.css";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";

interface AlergenosModalProps {
    alergeno: IAlergenos;
}

export const VerAlergeno: React.FC<AlergenosModalProps> = ({ alergeno }) => {
    const [esVisible, setEsVisible] = useState(true);
    const onClose = () => {
        setEsVisible(false);
    };
    if (!esVisible) return null;
    return (
        <div className={styles.modalBackdrop}>
            <div className="modal show" style={{ display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -35%)' }}>
                <Modal.Dialog className={styles.containerModal}>
                    <Modal.Header>
                        <Modal.Title style={{ textAlign: "center", width: "100%" }}>Alérgeno</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <p><b>Denominación: </b> {alergeno?.denominacion}</p>
                        {/* <p><b>Imágen: </b> {alergeno?.imagen}</p> */}
                    </Modal.Body>
                    <Modal.Footer style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Button variant="custom" className={styles.modalBoton} onClick={onClose}>
                            Cancelar
                        </Button>

                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </div>);
}
import styles from "./EmpresaModal.module.css"
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import { useState } from "react";
import { Modal } from "react-bootstrap";

interface EmpresaModalProps {
    empresa: IEmpresa;
}

export const VerEmpresa: React.FC<EmpresaModalProps> = ({ empresa }) => {

    const { nombre, razonSocial, cuit, logo } = empresa;

    const [esVisible, setEsVisible] = useState(true);

    const onClose = () => {
        setEsVisible(false);
    }
    if (!esVisible) return null;

    return (
        <div className={styles.modalContainer}>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title style={{textAlign: "center",width: "100%"}}>Empresa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <b>Nombre</b> {nombre}
                        </p>
                        <p>
                            <b>Razon Social</b> {razonSocial}
                        </p>
                        <p>
                            <b>CUIT</b> {cuit}
                        </p>
                        <p>
                            <b>Logo</b> {logo}
                        </p>
                    </Modal.Body>
                    <Modal.Footer style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <button className={styles.closeButton} onClick={onClose} >Cerrar</button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </div>
    );
}
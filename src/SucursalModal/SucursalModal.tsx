import styles from "./SucursalModal.module.css"
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { useState } from "react";
import { Modal } from "react-bootstrap";

interface SucursalModalProps {
    sucursal: ISucursal;
}

export const SucursalModal: React.FC<SucursalModalProps> = ({ sucursal }) => {

    const { nombre, empresa, domicilio, esCasaMatriz, horarioApertura, horarioCierre, logo } = sucursal;

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
                        <Modal.Title style={{textAlign: "center",width: "100%"}}>Sucursal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <b>Nombre</b> {nombre}
                        </p>
                        <p>
                            <b>Empresa</b> {empresa.nombre}
                        </p>
                        <p>
                            <b>Domicilio</b> {domicilio.calle} {domicilio.numero}
                        </p>
                        <p>
                            <b>¿Casa matriz?</b> {esCasaMatriz ? "Si" : "No"}
                        </p>
                        <p>
                            <b>Horario apertura</b> {horarioApertura}
                        </p>
                        <p>
                            <b>Horario cierre</b> {horarioCierre}
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
/*<div className={styles.cardContainer}>
            <Card style={{ width: '18rem'}}>
            <Card.Body>
                <Card.Title style={{ marginBottom: "24px" }}>Sucursal</Card.Title>
                <Card.Text>
                    <p>
                        <b>Nombre</b> {nombre}
                    </p>
                    <p>
                        <b>Empresa</b> {empresa.nombre}
                    </p>
                    <p>
                        <b>Domicilio</b> {domicilio.calle} {domicilio.numero}
                    </p>
                    <p>
                        <b>¿Casa matriz?</b> {esCasaMatriz? "Si" : "No"}
                    </p>
                    <p>
                        <b>Horario apertura</b> {horarioApertura}
                    </p>
                    <p>
                        <b>Horario cierre</b> {horarioCierre}
                    </p>
                    <p>
                        <b>Logo</b> {logo}
                    </p>
                </Card.Text>
                <button className= {styles.closeButton} onClick={onClose} >Cerrar</button>
            </Card.Body>
        </Card>
        </div>*/
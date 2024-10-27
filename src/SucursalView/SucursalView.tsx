import { Card } from "react-bootstrap";
import styles from "./SucursalView.module.css"
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { useState } from "react";

interface SucursalViewProps {
    sucursal: ISucursal;
}

export const SucursalView: React.FC<SucursalViewProps> = ({sucursal}) => {

    const {nombre, empresa, domicilio, esCasaMatriz, horarioApertura, horarioCierre, logo} = sucursal;

    const [esVisible, setEsVisible] = useState(true);

    const onClose = ()=> {
        setEsVisible(false);
    }
    if (!esVisible) return null;

    return (
        <div className={styles.cardContainer}>
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
        </div>
    );
}

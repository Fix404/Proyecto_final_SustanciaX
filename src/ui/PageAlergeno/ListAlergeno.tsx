import { FC } from "react";
import styles from "./ListAlergeno.module.css"
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { AlergenoItem } from "./AlergenoItem";
import { ListGroup } from "react-bootstrap";

interface IListAlergeno {
    alergenos: IAlergenos[];
}

export const ListAlergeno: FC<IListAlergeno> = ({ alergenos }) => {
    return (
        <>
            <ListGroup>
                <ListGroup.Item>
                <div className={styles.menuContainer}>
            <div className={styles.clasificacionesContainer}>
                <p>Denominación</p>
                <p>Imagen</p>
            </div>
            <p className={styles.textoAcciones}>Acciones</p>
            </div>
            <div >
                {alergenos.map((alergeno) => (
                    <AlergenoItem alergeno={alergeno} key={alergeno.id} />
                ))}
            </div>
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}

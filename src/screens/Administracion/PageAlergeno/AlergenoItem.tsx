import { FC } from "react";
import styles from "./AlergenoItem.module.css";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";

interface IAlergenosItem {
    alergeno: IAlergenos;
}

export const AlergenoItem: FC<IAlergenosItem> = ({ alergeno }) => {
    return (
        <div className={styles.itemContainer}>
            <div className={styles.productoContainer}>
                <p>{`${alergeno.denominacion}`}</p>
                <p>{`${alergeno.imagen}`}</p>
            </div>
            <div className={styles.accionesContainer}>
                <button>Ver</button>
                <button>Editar</button>
                <button>Eliminar</button>
            </div>
        </div>
    );
}
import { FC } from "react";
import styles from "./ListAlergeno.module.css"
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { AlergenoItem } from "./AlergenoItem";
import {Table } from "react-bootstrap";

interface IListAlergeno {
    alergenos: IAlergenos[];
}

export const ListAlergeno: FC<IListAlergeno> = ({ alergenos }) => {
    return (
        <div className={styles.scrollContainer}>
            <Table className={styles.mainContainer}>
                <thead className={styles.fixedHeader}>
                    <tr>
                        <th>Denominación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className={styles.containerTablaProducto}>

                    {alergenos.map((alergeno) => (
                    <AlergenoItem alergeno={alergeno} key={alergeno.id} />
                    ))}
                </tbody>
            </Table>
        </div>
    );
    // return (
    //     <>
    //         <ListGroup>
    //             <ListGroup.Item>
    //             <div className={styles.menuContainer}>
    //         <div className={styles.clasificacionesContainer}>
    //             <p>Denominación</p>
    //             <p>Imagen</p>
    //         </div>
    //         <p className={styles.textoAcciones}>Acciones</p>
    //         </div>
    //         <div className={styles.containerTablaAlergenos}>
    //             {alergenos.map((alergeno) => (
    //                 <AlergenoItem alergeno={alergeno} key={alergeno.id} />
    //             ))}
    //         </div>
    //             </ListGroup.Item>
    //         </ListGroup>
    //     </>
    // )
}

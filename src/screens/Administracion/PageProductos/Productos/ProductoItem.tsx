import { FC } from "react";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
import styles from "./ProductoItem.module.css";

interface IProductosItem {
    producto: IProductos;
}

export const ProductoItem: FC<IProductosItem> = ({ producto }) => {
    return (
        <div className={styles.itemContainer}>
            <div className={styles.productoContainer}>
                <p>{`${producto.denominacion}`}</p>
                <p>{`${producto.precioVenta}`}</p>
                <p className={styles.descripcion}>
                    {`${producto.descripcion}`}
                    <span className={styles.tooltip}>{`${producto.descripcion}`}</span>
                </p>
                <p>{`${producto.categoria.denominacion}`}</p>
                {producto.habilitado? <p>Si</p> : <p>No</p>}
            </div>
            <div className={styles.accionesContainer}>
                <button>Ver</button>
                <button>Editar</button>
                <button>Eliminar</button>
            </div>
        </div>
    );
}
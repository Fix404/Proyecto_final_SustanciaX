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
                {producto.habilitado ? (<span className="material-symbols-outlined" style={{ color: "green" }}>check_circle</span>)
                    :
                    (<span className="material-symbols-outlined" style={{ color: "red" }}>
                        cancel</span>)}
            </div>
            <div className={styles.accionesContainer}>
                <button>
                    <span className="material-symbols-outlined" style={{ color: "#ffb600" }}>visibility</span>
                </button>
                <button>
                    <span className="material-symbols-outlined" style={{ color: "#3e6d88" }}>edit</span>
                </button>
                <button>
                    <span className="material-symbols-outlined" style={{ color: "#933631" }}>delete</span>
                </button>
            </div>
        </div>
    );
}
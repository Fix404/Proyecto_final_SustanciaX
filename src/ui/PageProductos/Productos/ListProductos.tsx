import { FC } from "react";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { ProductoItem } from "./ProductoItem";
import styles from "./ListProductos.module.css"

interface IListProductos {
    productos: IProductos[];
}

export const ListProductos: FC<IListProductos> = ({ productos }) => {
    return (
        <div className={styles.itemContainer}>
            <div className={styles.menuContainer}>
            <div className={styles.clasificacionesContainer}>
                <p>Nombre</p>
                <p>Precio</p>
                <p>Descripción</p>
                <p>Categoría</p>
                <p>Habilitado</p>
            </div>
            <p className={styles.textoAcciones}>Acciones</p>
            </div>
            <div >
                {productos.map((producto) => (
                    <ProductoItem producto={producto} key={producto.id} />
                ))}
            </div>
        </div>
    )
} 

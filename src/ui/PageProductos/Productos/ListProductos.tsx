import { FC } from "react";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import {  Table } from "react-bootstrap";
import { ProductoItem } from "./ProductoItem";
import styles from "./ListProductos.module.css";

interface IListProductos {
  productos: IProductos[];
}

export const ListProductos: FC<IListProductos> = ({ productos }) => {
  return (
    <div className={styles.scrollContainer}>
      <Table className={styles.mainContainer}>
        <thead className={styles.fixedHeader}>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Habilitado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className={styles.containerTablaProducto}>
          {productos.map((producto) => (
            <ProductoItem producto={producto} key={producto.id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

/*<ListGroup>
    <ListGroup.Item>
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
            <div className={styles.containerTablaProducto} >
                {productos.map((producto) => (
                    <ProductoItem producto={producto} key={producto.id} />
                ))}
            </div>
    </ListGroup.Item>
</ListGroup>*/

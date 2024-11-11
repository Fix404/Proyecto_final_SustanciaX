import styles from "./VerProducto.module.css";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { IProductos } from "../../../types/dtos/productos/IProductos";
interface ProductosModalProps {
    producto: IProductos;
}

export const VerProducto: React.FC<ProductosModalProps> = ({ producto }) => {
    const { id, denominacion, precioVenta, descripcion, categoria, eliminado, habilitado, codigo, alergenos, imagenes } = producto;
    const [esVisible, setEsVisible] = useState(true);
    const onClose = () => {
        setEsVisible(false);
    };
    if (!esVisible) return null;
    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContainer}>
                <div className="modal show" style={{ display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title style={{ textAlign: "center", width: "100%" }}>Producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p><b>Denominación: </b> {denominacion}</p>
                            <p><b>Precio:</b> {precioVenta}</p>
                            <p><b>Descripción: </b> {descripcion}</p>
                            {/* <p><b>Categoría: </b> {categoria.categoriaPadre?.subCategorias}</p> */}
                            <p><b>Habilitado: </b> {habilitado}</p>
                            <p><b>Código: </b> {codigo}</p>
                            {/* <p><b>Alérgenos: </b> {}</p> */}
                            {/* <p><b>Imágenes: </b> {imagenes}</p> */}
                        </Modal.Body>
                        <Modal.Footer style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            </div>
        </div>);
}
import styles from "./VerProducto.module.css";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { IProductos } from "../../../types/dtos/productos/IProductos";
interface ProductosModalProps {
    producto: IProductos;
}

export const VerProducto: React.FC<ProductosModalProps> = ({ producto }) => {
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
                            <p><b>Denominación: </b> {producto?.denominacion}</p>
                            <p><b>Precio:</b> {producto?.precioVenta}</p>
                            <p><b>Descripción: </b> {producto?.descripcion}</p>
                            {/* <p><b>Categoría: </b> {categoria.categoriaPadre?.subCategorias}</p> */}
                            <p><b>Habilitado: </b> {producto?.habilitado}</p>
                            <p><b>Código: </b> {producto?.codigo}</p>
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
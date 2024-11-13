import styles from "./ProductosModal.module.css";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IProductos } from "../../types/dtos/productos/IProductos";

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
                <div className="modal show" style={{ display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -35%)' }}>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title style={{ textAlign: "center", width: "100%" }}>Producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem"}}>
                            <p><b>Denominación: </b><br /> {producto?.denominacion}</p>
                            <p><b>Precio:</b> {producto?.precioVenta}</p>
                            <p><b>Descripción: </b><br /> {producto?.descripcion}</p>
                            {/* <p><b>Categoría: </b> {categoria.categoriaPadre?.subCategorias}</p> */}
                            <p><b>Habilitado: </b> {producto?.habilitado ? <p>Si</p> : <p>No</p>}</p>
                            <p><b>Código: </b> {producto?.codigo}</p>
                            {/* <p><b>Alérgenos: </b> {}</p> */}
                            {/* <p><b>Imágenes: </b> {imagenes}</p> */}
                        </Modal.Body>
                        <Modal.Footer style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Button variant="custom" className={styles.modalBoton} onClick={onClose}>
                            Cancelar
                        </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
        </div>);
}
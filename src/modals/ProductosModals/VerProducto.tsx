import styles from "./ProductosModal.module.css";
import { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IProductos } from "../../types/dtos/productos/IProductos";

interface ProductosModalProps {
    producto: IProductos;
}

export const VerProducto: FC<ProductosModalProps> = ({ producto }) => {
    const [esVisible, setEsVisible] = useState(true);
    const alergenosList=producto?.alergenos?.map((alergeno, index) => (
        <li key={index}>{alergeno?.denominacion}</li>
    ))
    const onClose = () => {
        setEsVisible(false);
    };
    if (!esVisible) return null;

    return (
        <div className={styles.modalBackdrop}>
                <div className="modal show" style={{ display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Modal.Dialog>
                        <div className={styles.modalContainerProducto}>
                            <Modal.Header>
                                <Modal.Title style={{ textAlign: "center", width: "100%" }}>Producto</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={styles.modalBodyProducto}>
                                <p><b>Denominación: </b><br /> {producto?.denominacion}</p>
                                <p><b>Precio:</b> {producto?.precioVenta}</p>
                                <p><b>Descripción: </b><br /> {producto?.descripcion}</p>
                                {/* <p><b>Categoría: </b> {categoria.categoriaPadre?.subCategorias}</p> */}
                                <p><b>Habilitado: </b> </p>{producto?.habilitado ? <p>Sí</p> : <p>No</p>}
                                <p><b>Código: </b> {producto?.codigo}</p>
                                <p><b>Alérgenos: </b></p>
                                <ul style={{ listStyle: 'none', padding: "5px", margin: 0 }}>
                                    {alergenosList.length > 0 ? alergenosList :
                                    <p>No contiene alérgenos</p>}
                                </ul>
                                {/* <p><b>Imágenes: </b> {imagenes}</p> */}
                            </Modal.Body>
                            <Modal.Footer style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Button variant="custom" className={styles.modalBoton} onClick={onClose}>
                                Cancelar
                            </Button>
                            </Modal.Footer>
                        </div>
                    </Modal.Dialog>
                </div>
        </div>);
}
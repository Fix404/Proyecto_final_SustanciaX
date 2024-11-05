
import { Button, Dropdown } from "react-bootstrap";
import { productosData } from "../../../data/productosEjemplo";
import { ListProductos } from "../../../screens/Administracion/PageProductos/Productos/ListProductos";
import styles from "./BodyAdmin.module.css"

interface BodyAdminProps {
    activeSection: string;
}

export const BodyAdmin: React.FC<BodyAdminProps> = ({ activeSection }) => {
    return (
        <div className={styles.containerGeneralBody}>
            {activeSection === "PRODUCTOS" && (
                <div>
                    <div className={styles.headerContainer}>
                        <div className={styles.filtrarProductos}>
                            <p>Filtrar por categoría:</p>
                            <Dropdown >
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width:"35vh"}}>
                                    Seleccione una categoría
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{width:"35vh"}}>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Button variant="light">Agregar Producto</Button>
                    </div>
                    <div>
                        <ListProductos productos={productosData} />
                    </div>
                </div>
            )}
            {activeSection === "CATEGORIAS" && (
                <div>
                    <h1>Categorías</h1>
                </div>
            )}
            {activeSection === "ALERGENOS" && (
                <div>
                    <h1>Alergenos</h1>
                </div>
            )}
        </div>
    )
}

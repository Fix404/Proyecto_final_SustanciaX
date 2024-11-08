import { Button, Dropdown } from "react-bootstrap";
import { productosData } from "../../../data/productosEjemplo";
import { ListProductos } from "../../../screens/Administracion/PageProductos/Productos/ListProductos";
import styles from "./BodyAdmin.module.css";
import { useEffect, useState } from "react";
import { ServiceAlergeno } from "../../../services/ParticularServices/AlergenoService";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { CrearAlergeno } from "../../../screens/Administracion/PageAlergeno/CrearAlergeno";
import { alergenosData } from "../../../data/alergenoEjemplo";

interface BodyAdminProps {
    activeSection: string;
}

export const BodyAdmin: React.FC<BodyAdminProps> = ({ activeSection }) => {
    const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
    const [modalCrearAlergeno, setModalCrearAlergeno] = useState<boolean>(false);

    const serviceAlergeno = new ServiceAlergeno();
    useEffect(() => {
        const fetchAlergenos = async () => {
            try {
                const response = await serviceAlergeno.getAllAlergenos();
                setAlergenos(response.data);
            } catch (error) {
                console.error("Error al obtener los alergenos", error);
            }
        };
        fetchAlergenos();
    }, []);

    // Función para manejar la adición de un nuevo alérgeno
    const handleAddAlergeno = (nuevoAlergeno: IAlergenos) => {
        setAlergenos((prev) => [...prev, nuevoAlergeno]);
    };

    return (
        <div className={styles.containerGeneralBody}>
            {activeSection === "PRODUCTOS" && (
                <div>
                    <div className={styles.headerContainer}>
                        <div className={styles.filtrarProductos}>
                            <p>Filtrar por categoría:</p>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: "35vh" }}>
                                    Seleccione una categoría
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ width: "35vh" }}>
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
                   
                </div>
            )}

            {activeSection === "ALERGENOS" && (
                <div>
                    {/* Botón para agregar alérgeno */}
                    <button className="btn btn-primary my-3" onClick={() => setModalCrearAlergeno(true)}>
                        Agregar Alergeno
                    </button>

                    {/* Modal para crear alérgeno */}
                    {modalCrearAlergeno && (
                        <CrearAlergeno
                            onClose={() => setModalCrearAlergeno(false)}
                            onAddAlergeno={handleAddAlergeno}
                            alergeno={null}
                            editar={false}
                        />
                    )}

                    {/* Lista de alérgenos */}
                    <div>
                        <h3>Alergenos</h3>
                        {alergenosData ? (
                            <ul>
                                {alergenosData.map((alergeno) => (
                                    <li key={alergeno.id}>{alergeno.denominacion}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay alergenos disponibles.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

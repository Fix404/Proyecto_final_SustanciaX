import { Button, Dropdown, Form } from "react-bootstrap";
import { productosData } from "../../../data/productosEjemplo";
import { ListProductos } from "../../../screens/Administracion/PageProductos/Productos/ListProductos";
import styles from "./BodyAdmin.module.css";
import { useEffect, useState } from "react";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { CrearAlergeno } from "../../../screens/Administracion/PageAlergeno/CrearAlergeno";
import { ListAlergeno } from "../../../screens/Administracion/PageAlergeno/ListAlergeno";
import { AlergenoService } from "../../../services/ParticularServices/AlergenoService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setAlergenoList } from "../../../redux/slices/AlergenoReducer";

interface BodyAdminProps {
    activeSection: string;
}

export const BodyAdmin: React.FC<BodyAdminProps> = ({ activeSection }) => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch=useAppDispatch();
    const apiAlergeno=new AlergenoService("/api/alergenos");

    const getAlergenos= async ()=>{
        await apiAlergeno.getAll().then((alergenosData) => 
        dispatch(setAlergenoList(alergenosData)));
    }

    const alergenosData=useAppSelector(state => state.alergenoReducer.alergenosList);
    
    const toggleModal= (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setOpenModal(!openModal);
    }

    // Función para manejar la adición de un nuevo alérgeno
    const handleAddAlergeno = (nuevoAlergeno: IAlergenos) => {
        
    };



    useEffect(() => {
        getAlergenos();
    }, [activeSection]);

    return (
        <div className={styles.containerGeneralBody}>
            {activeSection === "PRODUCTOS" && (
                <div>
                    <div className={styles.headerContainer}>
                        <div className={styles.filtrarProductos}>
                            <p>Filtrar por categoría:</p>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: "35vh" }}>
                                    Seleccione una categoría:
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
                    <Form className="d-flex">
                    <button className="btn btn-primary my-3" onClick={toggleModal}>
                        Agregar Alérgeno
                    </button>
                    </Form>

                    {/* Modal para crear alérgeno */}
                    {openModal && (
                        <CrearAlergeno
                            openModal={openModal}
              setOpenModal={setOpenModal} getAlergenos={getAlergenos}/>
                    )}

                    {/* Lista de alérgenos */}
                    <div>
                        <h3>Alérgenos</h3>
                        {alergenosData ? (
                            <ListAlergeno alergenos={alergenosData}/>
                        ) : (
                            <p>No hay alergenos disponibles.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

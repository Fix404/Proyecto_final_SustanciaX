import { Button, Dropdown, Form } from "react-bootstrap";
import { productosData } from "../../../data/productosEjemplo";
import { ListProductos } from "../../../screens/Administracion/PageProductos/Productos/ListProductos";
import styles from "./BodyAdmin.module.css";
import { useEffect, useState } from "react";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { CrearAlergeno } from "../../../screens/Administracion/PageAlergeno/AlergenoModals/CrearAlergeno/CrearAlergeno";
import { ListAlergeno } from "../../../screens/Administracion/PageAlergeno/ListAlergeno";
import { AlergenoService } from "../../../services/ParticularServices/AlergenoService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setAlergenoList } from "../../../redux/slices/AlergenoReducer";
import categoriasEjemplo from "../../../data/categoriasEjemplo";
import { CrearProducto } from "../../../modals/ProductosModals/CrearProducto";
import { ProductoService } from "../../../services/ParticularServices/ProductoService";
import { useAppDispatch } from "../../../hooks/redux";
import { ServiceAlergeno } from "../../../services/ParticularServices/AlergenoService";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { CrearAlergeno } from "../../../screens/Administracion/PageAlergeno/CrearAlergeno";
import { alergenosData } from "../../../data/alergenoEjemplo";
import { setDataProductoList } from "../../../redux/slices/ProductosReducer";

const API_URL=import.meta.env.VITE_API_URL;
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



    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
    const productosFiltrados = categoriaSeleccionada
        ? productosData.filter(producto => producto.categoria && producto.categoria.id === categoriaSeleccionada)
        : productosData;

    const [openModalCrearProducto, setOpenModalCrearProducto] = useState(false);
    const handleOpenCrearProducto = () => {
        setOpenModalCrearProducto(!openModalCrearProducto);
    }

    const productoService = new ProductoService(API_URL + "/productos");
    const getProductos = async () => {
        await productoService.getAll().then((productosData) => {
            dispatch(setDataProductoList(productosData));
        });
    };

    useEffect(() => {
        getProductos();
    }, []);

    const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
    const [modalCrearAlergeno, setModalCrearAlergeno] = useState<boolean>(false);

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
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: "28vh" }}>
                                    {categoriaSeleccionada !== null
                                        ? categoriasEjemplo.find(categoria => categoria.id === categoriaSeleccionada)?.denominacion
                                        : "Categorías"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ width: "28vh" }}>
                                    <Dropdown.Item onClick={() => setCategoriaSeleccionada(null)}>
                                        Todos los productos
                                    </Dropdown.Item>
                                    {categoriasEjemplo.map((categoria) => (
                                        <Dropdown.Item
                                            key={categoria.id}
                                            onClick={() => setCategoriaSeleccionada(categoria.id)}
                                        >
                                            {categoria.denominacion}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        {openModalCrearProducto && 
                        <CrearProducto getProductos={getProductos} openModal={openModalCrearProducto} setOpenModal={setOpenModalCrearProducto} />}
                        <Button onClick={handleOpenCrearProducto} variant="light">Agregar Producto</Button>
                    </div>
                    <div>
                        <ListProductos productos={productosFiltrados} />
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
}


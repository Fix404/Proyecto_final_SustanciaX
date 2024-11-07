import { Button, Dropdown } from "react-bootstrap";
import { productosData } from "../../../data/productosEjemplo";
import { ListProductos } from "../../../screens/Administracion/PageProductos/Productos/ListProductos";
import styles from "./BodyAdmin.module.css";
import { useEffect, useState } from "react";
import categoriasEjemplo from "../../../data/categoriasEjemplo";
import { CrearProducto } from "../../../modals/ProductosModals/CrearProducto";
import { ProductoService } from "../../../services/ParticularServices/ProductoService";
import { setDataTable } from "../../../redux/slices/TableReducer";
import { useAppDispatch } from "../../../hooks/redux";
const API_URL=import.meta.env.VITE_API_URL;
interface BodyAdminProps {
    activeSection: string;
}

export const BodyAdmin: React.FC<BodyAdminProps> = ({ activeSection }) => {

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
    const productosFiltrados = categoriaSeleccionada
        ? productosData.filter(producto => producto.categoria && producto.categoria.id === categoriaSeleccionada)
        : productosData;

    const [openModalCrearProducto, setOpenModalCrearProducto] = useState(false);
    const handleOpenCrearProducto = () => {
        setOpenModalCrearProducto(!openModalCrearProducto);
    }

    const [loading, setLoading] = useState(false);
    const productoService = new ProductoService(API_URL + "/productos");
    const dispatch = useAppDispatch();
    const getProductos = async () => {
        await productoService.getAll().then((productosData) => {
            dispatch(setDataTable(productosData));
            setLoading(false);
        });
    };

    useEffect(() => {
        setLoading(true);
        getProductos();
    }, []);

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
                    <h1>Categorías</h1>
                </div>
            )}
            {activeSection === "ALERGENOS" && (
                <div>
                    <h1>Alergenos</h1>
                </div>
            )}
        </div>
    );
}




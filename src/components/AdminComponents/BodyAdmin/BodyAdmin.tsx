import { Button, Dropdown, Form, Pagination } from "react-bootstrap";
import { ListProductos } from "../../../ui/PageProductos/Productos/ListProductos";
import styles from "./BodyAdmin.module.css";
import { FC, useEffect, useState } from "react";
import { ListAlergeno } from "../../../ui/PageAlergeno/ListAlergeno";
import { useAppSelector } from "../../../hooks/redux";
import { setAlergenoList } from "../../../redux/slices/AlergenoReducer";
import { CrearProducto } from "../../../modals/ProductosModals/CrearProducto";
import { ProductoService } from "../../../services/ParticularServices/ProductoService";
import { useAppDispatch } from "../../../hooks/redux";
import { AlergenoService } from "../../../services/ParticularServices/AlergenoService";
import { setDataProductoList } from "../../../redux/slices/ProductosReducer";
import { CrearAlergeno } from "../../../modals/AlergenoModals/CrearAlergeno";
import { ListCategorias } from "../../../ui/PageCategorias/ListCategorias";
import { CategoriaService } from "../../../services/ParticularServices/CategoriaService";
import { setDataCategoriaList } from "../../../redux/slices/CategoriaReducer";
import { CrearCategoria } from "../../../modals/CategoriasModals/CrearCategoria";
import { IProductos } from "../../../types/dtos/productos/IProductos";

interface BodyAdminProps {
    activeSection: string;
}

export const BodyAdmin: FC<BodyAdminProps> = ({ activeSection }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalCrearProducto, setOpenModalCrearProducto] = useState(false);
    const [openModalCrearCategoria, setOpenModalCrearCategoria] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
    const [paginasTotales, setPaginasTotales] = useState(1);
    const [productosFiltrados, setProductosFiltrados] = useState<IProductos[]>([]);
    const categoriaActiva = useAppSelector((state) => state.categoriaReducer.elementActive);
    const productoActivo = useAppSelector((state) => state.productosReducer.elementActive);
    const alergenoActivo = useAppSelector((state) => state.alergenoReducer.alergenoActivo);
    const sucursalActiva = useAppSelector((state) => state.sucursalReducer.sucursalActiva)!;

    const dispatch = useAppDispatch();
    const apiAlergeno = new AlergenoService("/api/alergenos");

    const getAlergenos = async () => {
        await apiAlergeno.getAll().then((alergenosData) =>
            dispatch(setAlergenoList(alergenosData)));
    }

    const alergenosData = useAppSelector(state => state.alergenoReducer.alergenosList);

    const toggleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setOpenModal(!openModal);
    }

    const handleOpenCrearProducto = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setOpenModalCrearProducto(!openModalCrearProducto);
    }

    const handleOpenCrearCategoria = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setOpenModalCrearCategoria(!openModalCrearCategoria);
    }
    const productosData = useAppSelector((state) => state.productosReducer.dataList);
    const categoriaService = new CategoriaService("api/categorias");

    const getCategorias = async () => {
        if (sucursalActiva && sucursalActiva.id) {
            try {
                const categoriasDataApi = await categoriaService.getBySucursalId(sucursalActiva.id);

                if (Array.isArray(categoriasDataApi)) {
                    dispatch(setDataCategoriaList(categoriasDataApi));
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    const categoriasData = useAppSelector((state) => state.categoriaReducer.dataList);

    const [active, setActive] = useState(1)
    const itemsPaginados=[]
    // const pageAmount = Math.ceil((productosFiltrados.length) / 7);


    // Handler paginado onClick
    const handlePageChange = (page: number) => {
        setActive(page);
        fetchProductosBySucursalId(sucursalActiva?.id, page);
    };

    // Componente paginado
    for (let pageNumber = 1; pageNumber <= paginasTotales; pageNumber++) {
        itemsPaginados.push(
            
                <Pagination.Item  key={pageNumber} active={pageNumber === active} onClick={() => handlePageChange(pageNumber)}>
                    {pageNumber}
                </Pagination.Item>
       
        );
    }

    // if (productosFiltrados.length >= 7) {
    //     if (active == 1) {
    //         for (let i = 0; i < 7; i++) {
    //             productosOnPage.push(productosFiltrados[i]);
    //         }
    //     } else if (active != pageAmount) {
    //         for (let i = (active - 1) * 7; i < (active) * 7; i++) {
    //             productosOnPage.push(productosFiltrados[i]);
    //         }
    //     } else {
    //         for (let i = (active - 1) * 7; i < productosFiltrados.length; i++) {
    //             productosOnPage.push(productosFiltrados[i]);
    //         }
    //     }
    // } else {
    //     for (let i = 0; i < productosFiltrados.length; i++) {
    //         productosOnPage.push(productosFiltrados[i]);
    //     }
    // }

    const productosBySucursalId=new ProductoService("api/articulos/");
    const fetchProductosBySucursalId = async (sucursalId:number, pagina:number) => {
        try{
            const response=await productosBySucursalId.getProductosBySucursalId(sucursalId, (pagina-1), 7);
                dispatch(setDataProductoList(response.content))
                setPaginasTotales(response.totalPages);
            }
        catch(error){
            console.error("Error al traer los productos paginados: ", error)
        }
        
    }

    useEffect(() => {
        // getProductos();
        fetchProductosBySucursalId(sucursalActiva?.id, active);
        getAlergenos();
        getCategorias();
        console.log(productosData);
    }, []);

    useEffect(() => {
        getCategorias();
        // getProductos();
        fetchProductosBySucursalId(sucursalActiva?.id, active);
        getAlergenos();
    }, [categoriaActiva, productoActivo, alergenoActivo, sucursalActiva])

    useEffect(() => {
        if (categoriaSeleccionada) {
            setProductosFiltrados(
                productosData.filter(
                    (producto) => producto.categoria && producto.categoria.id === categoriaSeleccionada
                )
            );
        } else {
            setProductosFiltrados(productosData);
        }
    }, [categoriaSeleccionada, productosData]);

    return (
        <div className={styles.containerGeneralBody}>
            {activeSection === "PRODUCTOS" && (
                <div>
                    <div className={styles.headerContainer}>
                        <div className={styles.filtrarProductos}>
                          
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-success" id="dropdown-basic" style={{ width: "auto", minWidth: "15vw", maxWidth:"35vw" ,display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    {categoriaSeleccionada !== null
                                        ? categoriasData.find(categoria => categoria.id === categoriaSeleccionada)?.denominacion
                                        : "Filtrar por categoría"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={styles.dropdownMenu} >
                                    <Dropdown.Item onClick={() => setCategoriaSeleccionada(null)}>
                                        Todos los productos
                                    </Dropdown.Item>
                                    {categoriasData.map((categoria) => (
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
                        <Form className="d-flex">
                            <Button onClick={handleOpenCrearProducto} variant="outline-success" >AGREGAR PRODUCTO</Button>
                        </Form>
                        {openModalCrearProducto &&
                            <CrearProducto getProductos={() => fetchProductosBySucursalId(sucursalActiva?.id, paginasTotales)} openModal={openModalCrearProducto} setOpenModal={setOpenModalCrearProducto} />}
                    </div>
                    <div>
                        <ListProductos productos={productosFiltrados} />
                        <Pagination size="sm">{itemsPaginados}</Pagination>
                      
                    </div>
                </div>
            )}

            {activeSection === "CATEGORIAS" && (
                <div >
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
                        <Button variant="outline-success" onClick={handleOpenCrearCategoria}>
                            AGREGAR CATEGORÍA
                        </Button>
                    </div>

                    {openModalCrearCategoria && (
                        <CrearCategoria
                            openModal={openModalCrearCategoria}
                            setOpenModal={setOpenModalCrearCategoria} 
                            getCategorias={getCategorias}
                            idEmpresa={sucursalActiva?.empresa.id ?? 0} />
                    )} 
                    
                    {categoriasData.length > 0 ? (
                        <ListCategorias categorias={categoriasData} />
                    ) : (
                        <p>No hay categorías disponibles</p>
                    )}
                </div>
            )}

            {activeSection === "ALERGENOS" && (
                <div>
                    {/* Botón para agregar alérgeno */}
                    <Form className="d-flex">
                        <Button variant="outline-success" onClick={toggleModal} className="ms-auto" >
                            AGREGAR ALERGENO
                        </Button>
                    </Form>

                    {/* Modal para crear alérgeno */}
                    {openModal && (
                        <CrearAlergeno
                            openModal={openModal}
                            setOpenModal={setOpenModal} getAlergenos={getAlergenos} />
                    )}

                    {/* Lista de alérgenos */}
                    <div className={styles.divTablaAlergenos}>

                        {alergenosData ? (
                            <ListAlergeno alergenos={alergenosData} />
                        ) : (
                            <p>No hay alergenos disponibles.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}


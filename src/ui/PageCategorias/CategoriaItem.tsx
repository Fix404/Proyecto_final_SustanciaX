import { Accordion, Button, Card, useAccordionButton } from "react-bootstrap";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { FC, useState, useEffect } from "react";
import styles from "./CategoriaItem.module.css";
import { CategoriaService } from "../../services/ParticularServices/CategoriaService";
import { EditarCategoria } from "../../modals/CategoriasModals/EditarCategoria";
import { removeCategoriaElementActive, setCategoriaElementActive } from "../../redux/slices/CategoriaReducer";
import { useAppDispatch } from "../../hooks/redux";

interface ICategoriaItem {
    categoria: ICategorias;
}

export const CategoriaItem: FC<ICategoriaItem> = ({ categoria }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subcategorias, setSubcategorias] = useState<ICategorias[]>([]);
    const [openModalEditar, setOpenModalEditar] = useState(false);
    //const [openModalCrearSubcategoria, setOpenModalCrearSubcategoria] = useState(false);
    const dispatch = useAppDispatch();

    const categoriaService = new CategoriaService("api/categorias");

    useEffect(() => {
        const fetchSubcategorias = async () => {
            try {
                const subcategoriasData = await categoriaService.getByCategoriaId(categoria.id);
                setSubcategorias(subcategoriasData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSubcategorias();
    }, [categoria.id]);

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () => {
            setIsOpen(!isOpen);
        });

        return (
            <button type="button" style={{ border: "none", backgroundColor: "transparent" }} onClick={decoratedOnClick}>
                {children}
            </button>
        );
    }
    const handleEditarCategoria = () => {
        dispatch(removeCategoriaElementActive());
        dispatch(setCategoriaElementActive({ element: categoria }));
        setOpenModalEditar(!openModalEditar)
    }
    /*const handleCrearSubcategoria = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setOpenModalCrearSubcategoria(!openModalCrearSubcategoria);
    }*/

    const getCategorias = async () => {
        await categoriaService.getAll().then(() => {
            dispatch(setCategoriaElementActive({ element: categoria }))
        });
    }
    /*const getSubcategorias = async () => {
        await categoriaService.getByCategoriaId(categoria.id).then(() => {
            dispatch(setCategoriaElementActive({ element: categoria }))
        });
    }*/

    return (
        <div>
            <Accordion>
                <Card>
                    <Card.Header className={styles.cardHeader}>
                        {`${categoria.denominacion}`}
                        <div className={styles.actionButtons}>
                            <Button variant="none" onClick={handleEditarCategoria}>
                                <span className="material-symbols-outlined" style={{ color: "#3e6d88" }}>
                                    edit
                                </span>
                            </Button>
                            {openModalEditar &&
                                <EditarCategoria
                                    getCategorias={getCategorias} openModal={openModalEditar} setOpenModal={setOpenModalEditar} />}

                            <Button variant="success" /*onClick={handleCrearSubcategoria}*/>
                                <span className="material-symbols-outlined" style={{ color: "green" }}>
                                    add_box
                                </span>
                            </Button>

                            <CustomToggle eventKey="0">
                                <span className="material-symbols-outlined">
                                    {isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                                </span>
                            </CustomToggle>
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body style={{ paddingLeft: "10vh", paddingRight: "16vh" }}>
                            {subcategorias.length > 0 ? (
                                <div >
                                    {subcategorias.map((subcategoria, index) => (
                                        <div key={subcategoria.id}>
                                            <div className={styles.subCategoriasContainer}>
                                                <p >-  {subcategoria.denominacion}</p>
                                                <Button variant="none">
                                                    <span className="material-symbols-outlined" style={{ color: "#3e6d88" }}>
                                                        edit
                                                    </span>
                                                </Button>
                                            </div>
                                            {index !== subcategorias.length - 1 && <hr />}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No hay subcategorías disponibles</p>
                            )}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
};


/*
import { Accordion, Button, Card, useAccordionButton } from "react-bootstrap";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { FC, useState, useEffect } from "react";
import styles from "./CategoriaItem.module.css";
import { CategoriaService } from "../../services/ParticularServices/CategoriaService";
import { EditarCategoria } from "../../modals/CategoriasModals/EditarCategoria";
import { removeCategoriaElementActive, setCategoriaElementActive } from "../../redux/slices/CategoriaReducer";
import { useAppDispatch } from "../../hooks/redux";
import { CrearSubcategoria } from "../../modals/CategoriasModals/CrearSubcategoria";
import { ListSubcategorias } from "./ListSubcategorias";

interface ICategoriaItem {
    categoria: ICategorias;
}

export const CategoriaItem: FC<ICategoriaItem> = ({ categoria }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subcategorias, setSubcategorias] = useState<ICategorias[]>([]);
    const [openModalEditar, setOpenModalEditar] = useState(false);
    const [openModalCrearSubcategoria, setOpenModalCrearSubcategoria] = useState(false);
    const dispatch = useAppDispatch();

    const categoriaService = new CategoriaService("api/categorias");

    useEffect(() => {
        const fetchSubcategorias = async () => {
            try {
                const subcategoriasData = await categoriaService.getByCategoriaId(categoria.id);
                setSubcategorias(subcategoriasData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSubcategorias();
    }, [categoria.id]);

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () => {
            setIsOpen(!isOpen);
        });

        return (
            <button type="button" style={{ border: "none", backgroundColor: "transparent" }} onClick={decoratedOnClick}>
                {children}
            </button>
        );
    }
    const handleEditarCategoria = () => {
        dispatch(removeCategoriaElementActive());
        dispatch(setCategoriaElementActive({ element: categoria }));
        setOpenModalEditar(!openModalEditar)
    }
    const handleCrearSubcategoria = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setOpenModalCrearSubcategoria(!openModalCrearSubcategoria);
    }

    const getCategorias = async () => {
        await categoriaService.getAll().then(() => {
            dispatch(setCategoriaElementActive({ element: categoria }))
        });
    }
    const getSubcategorias = async () => {
        await categoriaService.getByCategoriaId(categoria.id).then(() => {
            dispatch(setCategoriaElementActive({ element: categoria }))
        });
    }

    return (
        <div>
            <Accordion>
                <Card>
                    <Card.Header className={styles.cardHeader}>
                        {`${categoria.denominacion}`}
                        <div className={styles.actionButtons}>
                            <Button variant="none" onClick={handleEditarCategoria}>
                                <span className="material-symbols-outlined" style={{ color: "#3e6d88" }}>
                                    edit
                                </span>
                            </Button>
                            {openModalEditar &&
                                <EditarCategoria
                                    getCategorias={getCategorias} openModal={openModalEditar} setOpenModal={setOpenModalEditar} />}

                            <Button variant="success" onClick={handleCrearSubcategoria}>
                                <span className="material-symbols-outlined" style={{ color: "green" }}>
                                    add_box
                                </span>
                            </Button>

                            <CustomToggle eventKey="0">
                                <span className="material-symbols-outlined">
                                    {isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                                </span>
                            </CustomToggle>
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body style={{ paddingLeft: "10vh", paddingRight: "16vh" }}>
                            <ListSubcategorias subCategorias={subcategorias} />
                        </Card.Body>
                        </Accordion.Collapse>
                </Card>
            </Accordion>
            {openModalCrearSubcategoria && (
                <CrearSubcategoria
                    openModal={openModalCrearSubcategoria}
                    setOpenModal={setOpenModalCrearSubcategoria}
                    getCategorias={getSubcategorias}
                    idCategoriaPadre={categoria.id} />
            )}
        </div>
    );
};
*/
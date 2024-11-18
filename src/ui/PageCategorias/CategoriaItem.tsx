import { Accordion, Button, Card, useAccordionButton } from "react-bootstrap";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { FC, useState, useEffect } from "react";
import styles from "./CategoriaItem.module.css";
import { CategoriaService } from "../../services/ParticularServices/CategoriaService";

interface ICategoriaItem {
    categoria: ICategorias;
}

export const CategoriaItem: FC<ICategoriaItem> = ({ categoria }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subcategorias, setSubcategorias] = useState<ICategorias[]>([]);

    const categoriaService = new CategoriaService("http://190.221.207.224:8090/categorias");

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

    return (
        <div>
            <Accordion>
                <Card>
                    <Card.Header className={styles.cardHeader}>
                        {`${categoria.denominacion}`}
                        <div className={styles.actionButtons}>
                            <Button variant="none">
                                <span className="material-symbols-outlined" style={{ color: "#3e6d88" }}>
                                    edit
                                </span>
                            </Button>
                            <Button variant="success">
                            <span className="material-symbols-outlined" style={{color:"green"}}>
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
                                    {subcategorias.map((subcategoria,  index) => (
                                        <div>
                                            <div className={styles.subCategoriasContainer}>
                                                <p key={subcategoria.id} >-  {subcategoria.denominacion}</p>
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

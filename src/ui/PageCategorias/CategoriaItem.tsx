import { Accordion, Button, Card, useAccordionButton } from "react-bootstrap"
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { FC, useState } from "react";
import styles from "./CategoriaItem.module.css"

interface ICategoriaItem {
    categoria: ICategorias;
}

export const CategoriaItem: FC<ICategoriaItem> = ({ categoria }) => {
    const [isOpen, setIsOpen] = useState(false);

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () => {
            setIsOpen(!isOpen);
            console.log('totally custom!');
        });

        return (
            <button
                type="button"
                style={{ border: "none", backgroundColor: "transparent" }}
                onClick={decoratedOnClick}
            >
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
                                <span className="material-symbols-outlined" style={{ color: "#3e6d88" }}>edit</span>
                            </Button>
                            <Button variant="none">
                                <span className="material-symbols-outlined" style={{ color: "#933631" }}>delete</span>
                            </Button>
                            <CustomToggle eventKey="0">
                                <span className="material-symbols-outlined">
                                    {isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                                </span>
                            </CustomToggle>
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}
import { Accordion, Card, Button } from "react-bootstrap";
import styles from "./CategoriaItem.module.css"
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { FC } from "react";

interface ISubcategoriaItem {
    subCategoria: ICategorias;
}

export const SubcategoriaItem: FC<ISubcategoriaItem> = ({ subCategoria }) => {
    return (
        <div>
            <div className={styles.subCategoriasContainer}>
                <p >-  {subCategoria.denominacion}</p>
                <Button variant="none">
                    <span className="material-symbols-outlined" style={{ color: "#3e6d88" }}>
                        edit
                    </span>
                </Button>
            </div>
            <hr />
        </div>
    )
}

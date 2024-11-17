import { FC } from "react";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { CategoriaItem } from "./CategoriaItem";
import styles from "./ListCategorias.module.css"

interface IListCategorias {
    categorias: ICategorias[];
}
export const ListCategorias:FC<IListCategorias> = ({ categorias }) => {

    return (
        <div className={styles.mainContainer}>
            {categorias.map((categoria) => (
                    <CategoriaItem  key={categoria.id} categoria={categoria} />
                ))}
        </div>
    )
}

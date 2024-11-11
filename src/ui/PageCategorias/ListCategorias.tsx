import { FC } from "react";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { CategoriaItem } from "./CategoriaItem";

interface IListCategorias {
    categorias: ICategorias[];
}
export const ListCategorias:FC<IListCategorias> = ({ categorias }) => {

    return (
        <div>
            {categorias.map((categoria) => (
                    <CategoriaItem  key={categoria.id} categoria={categoria} />
                ))}
        </div>
    )
}

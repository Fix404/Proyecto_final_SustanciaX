import { FC } from "react";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { SubcategoriaItem } from "./SubcategoriaItem";

interface IListSubcategorias {
    subCategorias: ICategorias[];
}
export const ListSubcategorias: FC<IListSubcategorias> = ({ subCategorias }) => {

    return (
        <div >
            {subCategorias.map((subCategoria) => (
                <SubcategoriaItem key={subCategoria.id} subCategoria={subCategoria} />
            ))}
        </div>
    )
}

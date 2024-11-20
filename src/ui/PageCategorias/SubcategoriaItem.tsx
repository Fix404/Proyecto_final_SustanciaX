import { Button } from "react-bootstrap";
import styles from "./CategoriaItem.module.css"
import { ICategorias } from "../../types/dtos/categorias/ICategorias";
import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeCategoriaElementActive, setCategoriaElementActive } from "../../redux/slices/CategoriaReducer";
import { CategoriaService } from "../../services/ParticularServices/CategoriaService";
import { EditarSubCategoria } from "../../modals/CategoriasModals/EditarSubCategoria";

interface ISubcategoriaItem {
    subCategoria: ICategorias;
}

export const SubcategoriaItem: FC<ISubcategoriaItem> = ({ subCategoria }) => {

    const [openModalEditar, setOpenModalEditar] = useState(false);
    const sucursalActiva = useAppSelector(state =>state.sucursalReducer.sucursalActiva);
    const categoriaService = new CategoriaService("api/categorias");

    const dispatch = useAppDispatch();

    const handleEditarSubCategoria = () => {
        dispatch(removeCategoriaElementActive());
        dispatch(setCategoriaElementActive({ element: subCategoria }));
        setOpenModalEditar(!openModalEditar)
    }
    const getSubcategorias = async () => {
        await categoriaService.getByCategoriaId(subCategoria.categoriaPadre!.id).then(() => {
            dispatch(setCategoriaElementActive({ element: subCategoria }))
        });
    }
    return (
        <div>
            <div className={styles.subCategoriasContainer}>
                <p >-  {subCategoria.denominacion}</p>
                <Button variant="none" onClick={handleEditarSubCategoria}>
                    <span className="material-symbols-outlined" style={{ color: "#3e6d88" }}>
                        edit
                    </span>
                    {openModalEditar &&
                    <EditarSubCategoria getSubCategorias={getSubcategorias}
                    openModal={openModalEditar}
                    setOpenModal={setOpenModalEditar} 
                    idCategoriaPadre={subCategoria.categoriaPadre!.id}
                    idEmpresa={sucursalActiva!.empresa.id}
                    idSucursales={subCategoria.sucursales.map((sucursal)=>sucursal.id)} />
                    }
                </Button>
            </div>
            <hr />
        </div>
    )
}

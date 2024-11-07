import { ICategorias } from "../types/dtos/categorias/ICategorias";
import { productosData } from "./productosEjemplo";

const categoriasEjemplo: ICategorias[] = [
    {
        id: 1,
        denominacion: "unaCategoría",
        eliminado: false,
        sucursales: [],
        subCategorias: [],
        categoriaPadre: null,
        articulos: productosData[0] 
    },
    {
        id: 2,
        denominacion: "otraCategoría",
        eliminado: false,
        sucursales: [],
        subCategorias: [],
        categoriaPadre: null,
        articulos: productosData[1] 
    },
    {
        id: 3,
        denominacion: "otraNuevaCategoría",
        eliminado: false,
        sucursales: [],
        subCategorias: [],
        categoriaPadre: null,
        articulos: productosData[3] 
    },
    {
        id: 4,
        denominacion: "ultimaCategoría",
        eliminado: false,
        sucursales: [],
        subCategorias: [],
        categoriaPadre: null,
        articulos: productosData[2] 
    },
];

export default categoriasEjemplo;

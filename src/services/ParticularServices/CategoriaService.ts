import { BackendClient } from "../BackendClient";
import { ICreateCategoria } from "../../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../../types/dtos/categorias/IUpdateCategoria";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";

export class CategoriaService extends BackendClient<ICreateCategoria | IUpdateCategoria | ICategorias> {
    
    async getBySucursalId(idSucursal: number): Promise<ICategorias[]> {
        const response = await fetch(`${this.baseUrl}/allCategoriasPorSucursal/${idSucursal}`);
        if (!response.ok) {
            throw new Error('Error al obtener las categorías');
        }
        return response.json();
    }

    async getByCategoriaId(categoriaId: number): Promise<ICategorias[]> {
        const response = await fetch(`${this.baseUrl}/allSubCategoriasPorCategoriaPadre/${categoriaId}/1`);
        if (!response.ok) {
            throw new Error('Error al obtener las subcategorías');
        }
        return response.json();
    }
}

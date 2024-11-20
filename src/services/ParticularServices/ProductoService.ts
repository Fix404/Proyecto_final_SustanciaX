import { ICreateProducto } from "../../types/dtos/productos/ICreateProducto";
import { BackendClient } from "../BackendClient";
import { IUpdateProducto } from "../../types/dtos/productos/IUpdateProducto";
import { IProductos } from "../../types/dtos/productos/IProductos";

export class ProductoService extends BackendClient<ICreateProducto|IUpdateProducto|IProductos> {
    getProductosBySucursalId = async (idSucursal:Number, page:Number, size:Number):Promise<IProductos[]> => {
        try{
            const response=await fetch(`${this.baseUrl}pagedPorSucursal/${idSucursal}?page=${page}&size=${size}`)
            if(!response) {
                throw new Error("Error al traer los productos paginados")}
            const data =await response.json()
            return data;
        }catch(error){
            console.log("Error al traer los productos");
            throw error
        }
    }
}
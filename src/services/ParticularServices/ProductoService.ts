import { ICreateProducto } from "../../types/dtos/productos/ICreateProducto";
import { BackendClient } from "../BackendClient";
import { IUpdateProducto } from "../../types/dtos/productos/IUpdateProducto";
import { IProductos } from "../../types/dtos/productos/IProductos";

export class ProductoService extends BackendClient<ICreateProducto|IUpdateProducto|IProductos> {}
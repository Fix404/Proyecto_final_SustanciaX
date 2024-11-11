import { BackendClient } from "../BackendClient";
import { ICreateCategoria } from "../../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../../types/dtos/categorias/IUpdateCategoria";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";

export class CategoriaService extends BackendClient<ICreateCategoria|IUpdateCategoria|ICategorias> {}
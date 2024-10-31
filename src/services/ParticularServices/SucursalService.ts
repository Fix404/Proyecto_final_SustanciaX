import { ICreateSucursal } from "../../types/dtos/sucursal/ICreateSucursal";
import { BackendClient } from "../BackendClient";

export class SucursalService extends BackendClient<ICreateSucursal> {}

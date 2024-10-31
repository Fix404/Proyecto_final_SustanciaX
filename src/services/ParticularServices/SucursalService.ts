<<<<<<< HEAD
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { BackendClient } from "../BackendClient";

export class SucursalService extends BackendClient<ISucursal> {}
=======
import { ICreateSucursal } from "../../types/dtos/sucursal/ICreateSucursal";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../../types/dtos/sucursal/IUpdateSucursal";
import { BackendClient } from "../BackendClient";

export class SucursalService extends BackendClient<ICreateSucursal|IUpdateSucursal|ISucursal> {}
>>>>>>> 73ff9feea0854e6fcd6eb876815746b8bd02922b

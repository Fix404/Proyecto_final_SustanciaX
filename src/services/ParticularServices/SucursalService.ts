import { ICreateSucursal } from "../../types/dtos/sucursal/ICreateSucursal";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../../types/dtos/sucursal/IUpdateSucursal";
import { BackendClient } from "../BackendClient";

export class SucursalService extends BackendClient<ISucursal|IUpdateSucursal| ICreateSucursal> {
     getSucursalesPorEmpresaId = async (id:number):Promise<ISucursal[]> => {
        try{
            const response = await fetch(`${this.baseUrl}sucursales/porEmpresa/${id}`);

            if(response){
                const data = await response.json();
                return data
            }else{
                throw new Error("No se encuentran sucursales para esta empresa")
            }
        }catch(error){
            console.error("Error al obtener las sucursales: ",error);
            throw error;
        }
    }
}

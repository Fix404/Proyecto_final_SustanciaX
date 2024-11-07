import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { BackendClient } from "../BackendClient";

export class SucursalService extends BackendClient<ISucursal> {
    getSucursalesPorEmpresaId = async (id:number):Promise<ISucursal[]> => {
        try{
            const response=await this.get(`porEmpresa/${id}`);

            if(response){
                return response;
            }else{
                throw new Error("No se encuentran sucursales para esta empresa")
            }
        }catch(error){
            console.error("Error al obtener las sucursales: ",error);
            throw error;
        }
    }
}

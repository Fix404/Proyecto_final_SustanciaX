import { IProvincia } from "../../types/IProvincia";
import { BackendClient } from "../BackendClient";

export class ProvinciaService extends BackendClient<IProvincia>{
    getProvinciasPorPaisId = async (id:number):Promise<IProvincia[]> => {
        try{
            const response = await fetch(`${this.baseUrl}provincias/findByPais/${id}`);

            if(response){
                const data = await response.json();
                return data
            }else{
                throw new Error("No se encuentran provincias para este país")
            }
        }catch(error){
            console.error("Error al obtener las provincias: ",error);
            throw error;
        }
    }
}
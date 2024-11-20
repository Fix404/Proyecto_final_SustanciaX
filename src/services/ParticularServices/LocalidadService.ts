import { ILocalidad } from "../../types/ILocalidad";
import { BackendClient } from "../BackendClient";

export class LocalidadService extends BackendClient<ILocalidad>{
    getlocalidadesPorProvId = async (id:number):Promise<ILocalidad[]> => {
        try{
            const response = await fetch(`${this.baseUrl}localidades/findByProvincia/${id}`);

            if(response){
                const data = await response.json();
                return data
            }else{
                throw new Error("No se encuentran localidades para esta provincia")
            }
        }catch(error){
            console.error("Error al obtener las localidades: ",error);
            throw error;
        }
    }
}
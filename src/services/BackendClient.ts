import { AbstractBackendClient } from "./AbstractBackendClient";


export abstract class BackendClient<T> extends AbstractBackendClient<T> {
    constructor(baseUrl: string) {
      super(baseUrl);
    }
    
    async get(endpoint:string):Promise<T[]>{
      try{
        const response= await fetch(`${this.baseUrl}${endpoint}`,
          {
            method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
          }
        );
        if(!response.ok){
          throw new Error("Error en la solicitud");
        }

        const data= await response.json();

        return data as T[];
      }catch(error){
        console.error("Error en la request GET: ", error);
        throw error;
      }
    }

    async getAll(): Promise<T[]> {
      const response = await fetch(`${this.baseUrl}`
      );
      const data = await response.json();
      return data as T[];
    }
  
    async getById(id: number): Promise<T | null> {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data as T;
    }
  
    async post(data: T): Promise<T> {
      console.log(data);
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // Obtenemos los detalles del error
        console.error("Error en el POST:", response.status, errorDetails);
        throw new Error(`Error en POST: ${response.status} ${errorDetails}`);
      }
      
      const newData = await response.json();
      return newData as T;
    }
  
    async put(id: number, data: T): Promise<T> {
      console.log(data);
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // Obtenemos los detalles del error
        console.error("Error en el PUT:", response.status, errorDetails);
        throw new Error(`Error en PUT: ${response.status} ${errorDetails}`);
      }
      
      const newData = await response.json();
      return newData as T;
    }
  
    async delete(id: number): Promise<void> {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar el elemento con ID ${id}`);
      }
    }
  }
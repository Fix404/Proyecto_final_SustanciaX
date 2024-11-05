import { ICreateAlergeno } from "../../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../../types/dtos/alergenos/IUpdateAlergeno";

export class ServiceAlergeno {
  private baseURL: string;

  constructor() {
    this.baseURL = "http://190.221.207.224:8090/alergenos"; 
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  public getAlergenoById(id: number): Promise<any> {
    const url = `${this.baseURL}/${id}`;
    return this.request<any>(url, {
      method: "GET",
      headers: {
        "User-Agent": "insomnia/9.3.1",
      },
    });
  }

  public getAllAlergenos(): Promise<any> {
    const url = `${this.baseURL}`;
    return this.request<any>(url, {
      method: "GET",
    });
  }

  public createAlergeno(alergeno: ICreateAlergeno): Promise<any> {
    const url = `${this.baseURL}`;
    const formData = new FormData();

    // Verificar y agregar propiedades a FormData
    for (const key in alergeno) {
      const value = alergeno[key as keyof ICreateAlergeno];
      if (value !== null) { // Asegúrate de que el valor no sea null
        formData.append(key, value as string | Blob); // Asegúrate de que el valor sea un string o Blob
      }
    }

    return this.request<any>(url, {
      method: "POST",
      body: formData,
    });
  }

  public editAlergeno(id: number, alergeno: IUpdateAlergeno): Promise<any> {
    const url = `${this.baseURL}/${id}`;
    const formData = new FormData();

    // Verificar y agregar propiedades a FormData
    for (const key in alergeno) {
      const value = alergeno[key as keyof IUpdateAlergeno];
      if (value !== null) { // Asegúrate de que el valor no sea null
        formData.append(key, value as string | Blob); // Asegúrate de que el valor sea un string o Blob
      }
    }

    return this.request<any>(url, {
      method: "PUT",
      body: formData,
    });
  }

  public deleteAlergenoById(id: number): Promise<any> {
    const url = `${this.baseURL}/${id}`;
    return this.request<any>(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public deleteAlergenoImage(id: number, publicId: string): Promise<any> {
    const url = `${this.baseURL}/${id}/${publicId}`;
    return this.request<any>(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
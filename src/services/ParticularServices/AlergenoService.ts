import axios, { AxiosResponse } from "axios";
import { ICreateAlergeno } from "../../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../../types/dtos/alergenos/IUpdateAlergeno";

export class ServiceAlergeno {
  private baseURL: string;

  constructor() {
    this.baseURL = "http://190.221.207.224:8090/alergenos";
  }

  public async getAlergenoById(id: number): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}`;
    return axios.get(url, {
      headers: {
        "User-Agent": "insomnia/9.3.1",
      },
    });
  }

  public async getAllAlergenos(): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}`;
    return axios.get(url);
  }

  public async createAlergeno(
    alergeno: ICreateAlergeno
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}`;
    return axios.post(url, alergeno, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async editAlergeno(
    id: number,
    alergeno: IUpdateAlergeno
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}`;
    return axios.put(url, alergeno, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async deleteAlergenoById(id: number): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}`;
    return axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async deleteAlergenoImage(id: number, publicId: string): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}/${publicId}`;
    
    return axios.delete(url, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
}
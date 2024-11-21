import { baseDto } from "../baseDto/baseDto";
export interface ICreateEmpresaDto extends baseDto {
  nombre: string;
  razonSocial: string;
  cuit: number;
  logo: string | null;
}

import { ICreateEmpresaDto } from "../../types/dtos/empresa/ICreateEmpresaDto";
import { BackendClient } from "../BackendClient";

export class EmpresaService extends BackendClient<ICreateEmpresaDto> {}
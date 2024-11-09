import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../../types/dtos/alergenos/IUpdateAlergeno";
import { BackendClient } from "../BackendClient";

export class AlergenoService extends BackendClient<ICreateAlergeno|IUpdateAlergeno|IAlergenos>{} 
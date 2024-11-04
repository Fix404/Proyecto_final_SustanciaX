import { FC } from "react"
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa"
import styles from "./ListEmpresas.module.css";
import { CardEmpresa } from "../CardEmpresa/CardEmpresa";

interface IListEmpresas{
    empresas: IEmpresa[],
}

export const ListEmpresas:FC<IListEmpresas> = ({empresas}) => {
  return (
    <div className={styles.contenedorPrincipalListaEmpresas}>
        <div className={styles.contenedorLista}>
            {empresas.map((empresa) => (
                <CardEmpresa empresa={empresa} key={empresa.id}/>
            ))}
        </div>
    </div>
  )
}

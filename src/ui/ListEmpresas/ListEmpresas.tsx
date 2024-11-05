
import { FC } from "react"
import styles from "./ListEmpresas.module.css"
import { CardEmpresa } from "../CardEmpresa/CardEmpresa"
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa"

interface IListEmpresas{
   empresas:IEmpresa[]
}

export const ListEmpresas:FC<IListEmpresas> = ({empresas}) => {
  return (
    <div className={styles.contenedorPrincipalListaEmpresas}>
        <div className={styles.contenedorListaEmpresa}>
            {empresas.map((empresa) => (
                <CardEmpresa empresa={empresa} key={empresa.id}/>
            ))}
        </div>

    </div>
  )
}

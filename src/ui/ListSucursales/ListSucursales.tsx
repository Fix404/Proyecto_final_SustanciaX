import { FC } from "react"
import { ISucursal } from "../../types/dtos/sucursal/ISucursal"
import styles from "./ListSucursales.module.css"
import { CardSucursal } from "../CardSucursal/CardSucursal"

interface IListSucursales{
    sucursales:ISucursal[]
}

export const ListSucursales:FC<IListSucursales> = ({sucursales}) => {
  return (
    <div className={styles.contenedorPrincipalListaSucursales}>
        <div className={styles.contenedorLista}>
            {sucursales.map((sucursal) => (
                <CardSucursal sucursal={sucursal} key={sucursal.id}/>
            ))}
        </div>
    </div>
  )
}

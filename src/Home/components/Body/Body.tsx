import { sucrsalesData } from "../../data/sucursalesEjemplo"
import { ListSucursales } from "../../ui/ListSucursales/ListSucursales"
import styles from "./Body.module.css"

export const Body = () => {
  return (
    <div className={styles.containerGeneralBody}>
        <ListSucursales sucursales={sucrsalesData}/>
    </div>
  )
}

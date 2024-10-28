
import styles from "./Header.module.css"


export const Header = () => {
  return (
    <div className={styles.containerHeader}>

      <div className={styles.containerTitulo}>
        <div>
          <p className={styles.headerTitulo}>Sucursales de: </p>
          </div>
          <div>
          <p>Aparece el nombre de la Empresa</p>
        </div>
      </div>

      <div className={styles.divContainerAddSucursal}>
        <button className={styles.containerAddSucursal}>AGREGAR SUCURSAL</button>
      </div>

    </div>
  )
}

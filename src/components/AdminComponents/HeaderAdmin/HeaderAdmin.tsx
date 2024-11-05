import { Nav } from "react-bootstrap"
import styles from "./HeaderAdmin.module.css"

export const HeaderAdmin = () => {
  return (
    <Nav className={styles.containerNav}>
      <Nav.Item>
        <Nav.Link href="/" >
          <span className="material-symbols-rounded">
            <div className={styles.containerIcon}>keyboard_backspace</div>
          </span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <p className={styles.containerSucursal}>EMPRESA - SUCURSAL TAL</p>
      </Nav.Item>
    </Nav>
  )
}

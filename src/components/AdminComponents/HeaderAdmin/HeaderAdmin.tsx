import { Nav } from "react-bootstrap"
import styles from "./HeaderAdmin.module.css"

export const HeaderAdmin = () => {
  return (
    <Nav className={styles.containerNav}>
      <Nav.Item>
        <Nav.Link href="/"><span className="material-symbols-rounded">
keyboard_backspace
</span></Nav.Link>
      </Nav.Item>
      
    </Nav>
  )
}

import { Container, Navbar } from "react-bootstrap"

export const NavBar = () => {
  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Sustancia X</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
    </div>
  )
}

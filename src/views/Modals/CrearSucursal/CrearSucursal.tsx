import { useState } from "react";
import { Button, Form, Modal} from "react-bootstrap";

export const CrearSucursal = () => {
  const [show, setShow]=useState(false)

  const handleShow=()=> setShow(true);
  const handleClose=() => setShow(false);
  return (
    <>
        <Button variant="primary" onClick={handleShow}>Test Me</Button>

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header>
            <Modal.Title>Crear Sucursal:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                      <Form.Group className="mb-3" controlId="nombre">
                        <Form.Control
                          type="text"
                          placeholder="Ingrese un nombre aquí"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="horarioApertura">
                        <Form.Control
                          type="text"
                          placeholder="Ingrese horario de apertura"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="horarioClausura">
                        <Form.Control
                          type="text"
                          placeholder="Ingrese horario de clausura"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Select
                        aria-label="Default select example"
                        id="pais"
                      >
                        <option>País</option>
                        <option value="1">Argentina</option>
                        <option value="2">Burkina Faso</option>
                        <option value="3">Tonga</option>
                      </Form.Select>
                      <Form.Select
                        aria-label="Default select example"
                        id="provincia"
                      >
                        <option>Provincia</option>
                        <option value="1">Mendoza</option>
                        <option value="2">Córdoba</option>
                        <option value="3">La Pampa</option>
                      </Form.Select>
                      <Form.Select
                        aria-label="Default select example"
                        id="localidad"
                      >
                        <option>Localidad</option>
                        <option value="1">Maipú</option>
                        <option value="2">Las Heras</option>
                        <option value="3">Godoy Cruz</option>
                      </Form.Select>
                      <Form.Group className="mb-3" controlId="latitud">
                        <Form.Control
                          type="text"
                          placeholder="Ingrese latitud"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="longitud">
                        <Form.Control
                          type="text"
                          placeholder="Ingrese longitud"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="nombreCalle">
                        <Form.Control
                          type="text"
                          placeholder="Nombre de la calle"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="numeroDeCalle">
                        <Form.Control
                          type="text"
                          placeholder="Número de la calle"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="codigoPostal">
                        <Form.Control
                          type="text"
                          placeholder="Código Postal"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="numeroDePiso">
                        <Form.Control
                          type="text"
                          placeholder="Número de piso"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="numeroDeDepartamento"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Número de departamento"
                          autoFocus
                        />
                      </Form.Group>
              </Form>
              <Form>
                <Form.Group controlId="imagenSucursal" className="mb-3">
                  <Form.Label>Suba una imagen</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" onClick={handleClose}>Aceptar</Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};

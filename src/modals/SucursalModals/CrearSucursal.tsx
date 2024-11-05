import { Button, Form, Modal} from "react-bootstrap"
import { Formik } from "formik";

import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeElementActive } from "../../redux/slices/TableReducerSucursal";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { SucursalService } from "../../services/ParticularServices/SucursalService";

const API_URL=import.meta.env.VITE_API_URL;

interface IPropsCreateSucursal{
  openModal: boolean
  setOpenModal: (state:boolean) => void
}

export const CrearSucursal = ({
  openModal,
  setOpenModal,
}: IPropsCreateSucursal) => {
  const apiSucursal = new SucursalService(API_URL + "/sucursale/create");


  const initialValues: ISucursal = {
    id:0,
    empresa:{
      id: 0,
  nombre: "",
  razonSocial: "",
  cuit: 0,
  logo: "",
  sucursales: [],
  pais: {
    nombre:"",
    id:0
  },
    },
    nombre: "",
    calle:"",
    categorias:[],
    eliminado: false,
  horarioApertura: "",
  horarioCierre: "",
  esCasaMatriz: false,
  latitud: 0,
  longitud: 0,
  domicilio: {
    id:0,
    calle: "",
    numero: 0,
    cp: 0,
    piso: 0,
    nroDpto: 0,
    localidad: {
      id:0,
      nombre:"",
      provincia:{
        nombre:"",
        pais:{
          nombre:"",
          id:0
        },
        id:0
      }
    },
  },
  logo: "",
  }

  const elementActive=useAppSelector(
    (state) => state.tablaReducerSucursal.elementActive);
  const dispatch=useAppDispatch();

  const handleClose=() => {
    setOpenModal(false);
    dispatch(removeElementActive())
  }
  return (
    <>
        <Modal show={openModal} onHide={handleClose} backdrop="static" keyboard={false} data-bs-theme="dark" size="lg" id={"modal"}>
          <Modal.Header style={{display:"flex", alignContent:"center", justifyContent:"center"}}>
            <Modal.Title style={{color:"white"}}>Crear Sucursal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              horarioApertura: Yup.string().required("Campo requerido"),
              horarioCierre: Yup.string().required("Campo requerido"),
              esCasaMatriz: Yup.boolean(),
              latitud: Yup.number(),
              longitud: Yup.number(),
              domicilio:Yup.object({
                calle: Yup.string().required("Campo requerido"),
                numero: Yup.number(),
                cp: Yup.number().required("Campo requerido"),
                piso: Yup.number(),
                nroDpto: Yup.number(),
                idLocalidad: Yup.number(),
              }),
              idEmpresa: Yup.number()})}
            initialValues={elementActive ? elementActive: initialValues}
              enableReinitialize={true}
              onSubmit={async (values:ISucursal) => {
                if(elementActive){
                  await apiSucursal.post(values);
                }
                handleClose();
              }}>
                {() => (
                  <>
                  <Form style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)"}} >
                <div>
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
                </div>
                <div>
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
                </div>
                <div>
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
                </div>
                <div>
                <Form.Group controlId="imagenSucursal" className="mb-3">
                  <Form.Label>Suba una imagen</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                </div>
              </Form>
                  </>
                )}
            </Formik>
          </Modal.Body>
          <Modal.Footer style={{display:"flex", alignContent:"center", justifyContent:"space-evenly"}}>
            <Button variant="danger" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" type="submit">Aceptar</Button>
          </Modal.Footer>
        </Modal>
    </>
  )
}
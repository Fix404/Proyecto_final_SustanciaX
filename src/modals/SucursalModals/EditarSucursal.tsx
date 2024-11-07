import { Button, Form, Modal } from "react-bootstrap";
import { IUpdateSucursal } from "../../types/dtos/sucursal/IUpdateSucursal";
import { SucursalService } from "../../services/ParticularServices/SucursalService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeElementActive } from "../../redux/slices/TableReducer";
import { Formik } from "formik";
import * as Yup from "yup";

const API_URL = import.meta.env.VITE_API_URL;

interface IPropsUpdateSucursal {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  getSucursales: Function;
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

export const EditarSucursal = ({
  getSucursales,
  openModal,
  setOpenModal,
}: IPropsUpdateSucursal) => {
  const initialValues: IUpdateSucursal = {
    id: 0, 
    nombre: "",
    idEmpresa: 0,
    eliminado: false, 
    latitud: 0,
    longitud: 0,
    domicilio: {
      id: 0, 
      calle: "",
      numero: 0,
      cp: 0,
      piso: 0,
      nroDpto: 0,
      idLocalidad: 0,
    },
    logo: null,
    categorias: [],
    esCasaMatriz: false,
    horarioApertura: "",
    horarioCierre: "",
  };

  const apiSucursal = new SucursalService(API_URL + "/sucursales");
  const elementActive = useAppSelector((state) => state.tablaReducer.elementActive);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeElementActive());
  };

  return (
    <>
      <Modal
        show={openModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        data-bs-theme="dark"
        size="lg"
        id={"modal"}
      >
        <Modal.Header
          style={{ display: "flex", alignContent: "center", justifyContent: "center" }}
        >
          <Modal.Title style={{ color: "white" }}>Editar Sucursal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={elementActive ? (elementActive as IUpdateSucursal) : initialValues}
            enableReinitialize={true}
            validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              horarioApertura: Yup.string().required("Campo requerido"),
              horarioCierre: Yup.string().required("Campo requerido"),
              esCasaMatriz: Yup.boolean(),
              latitud: Yup.number(),
              longitud: Yup.number(),
              domicilio: Yup.object({
                calle: Yup.string().required("Campo requerido"),
                numero: Yup.number(),
                cp: Yup.number().required("Campo requerido"),
                piso: Yup.number(),
                nroDpto: Yup.number(),
                idLocalidad: Yup.number(),
              }),
              idEmpresa: Yup.number(),
            })}
            onSubmit={async (values: IUpdateSucursal) => {
              if (elementActive) {
                await apiSucursal.put(values.id, values); 
              }
              getSucursales();
              handleClose();
            }}
          >
            {({ handleSubmit }) => (
              <>
                <Form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                  <Form.Group className="mb-3" controlId="nombre">
                    <Form.Control type="text" placeholder="Ingrese un nombre aquí" autoFocus name="nombre" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="horarioApertura">
                    <Form.Control type="text" placeholder="Ingrese horario de apertura" name="horarioApertura" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="horarioCierre">
                    <Form.Control type="text" placeholder="Ingrese horario de cierre" name="horarioCierre" />
                  </Form.Group>
                  <Form.Select aria-label="Default select example" id="pais" name="pais">
                    <option>País</option>
                    <option value="1">Argentina</option>
                    <option value="2">Burkina Faso</option>
                    <option value="3">Tonga</option>
                  </Form.Select>
                  <Form.Select aria-label="Default select example" id="provincia" name="provincia">
                    <option>Provincia</option>
                    <option value="1">Mendoza</option>
                    <option value="2">Córdoba</option>
                    <option value="3">La Pampa</option>
                  </Form.Select>
                  <Form.Select aria-label="Default select example" id="localidad" name="domicilio.idLocalidad">
                    <option>Localidad</option>
                    <option value="1">Maipú</option>
                    <option value="2">Las Heras</option>
                    <option value="3">Godoy Cruz</option>
                  </Form.Select>
                  <Form.Group className="mb-3" controlId="latitud">
                    <Form.Control type="text" placeholder="Ingrese latitud" name="latitud" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="longitud">
                    <Form.Control type="text" placeholder="Ingrese longitud" name="longitud" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="nombreCalle">
                    <Form.Control type="text" placeholder="Nombre de la calle" name="domicilio.calle" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="numeroDeCalle">
                    <Form.Control type="text" placeholder="Número de la calle" name="domicilio.numero" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="codigoPostal">
                    <Form.Control type="text" placeholder="Código Postal" name="domicilio.cp" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="numeroDePiso">
                    <Form.Control type="text" placeholder="Número de piso" name="domicilio.piso" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="numeroDeDepartamento">
                    <Form.Control type="text" placeholder="Número de departamento" name="domicilio.nroDpto" />
                  </Form.Group>
                  <Form.Group controlId="imagenSucursal" className="mb-3">
                    <Form.Label>Suba una imagen</Form.Label>
                    <Form.Control type="file" name="logo" />
                  </Form.Group>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", alignContent: "center", justifyContent: "space-evenly" }}>
          <Button variant="danger" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" type="submit" form="modal">Guardar cambios</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

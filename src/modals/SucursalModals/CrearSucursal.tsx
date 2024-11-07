import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";

import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeElementActive } from "../../redux/slices/TableReducerSucursal";
import { ICreateSucursal } from "../../types/dtos/sucursal/ICreateSucursal";
import { SucursalService } from "../../services/ParticularServices/SucursalService";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

interface IPropsCreateSucursal {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

export const CrearSucursal = ({
  openModal,
  setOpenModal,
}: IPropsCreateSucursal) => {
  const empresaActiva=useAppSelector((state)=> state.empresaReducer.elementActive);
  const apiSucursal = new SucursalService(API_URL + "sucursales/create");

  const initialValues: ICreateSucursal = {
    nombre: "",
    horarioApertura: "",
    horarioCierre: "",
    esCasaMatriz: false,
    latitud: 0,
    longitud: 0,
    domicilio: {
      idLocalidad:1,
      calle: "",
      numero: 0,
      cp: 0,
      piso: 0,
      nroDpto: 0,
    },
    logo: "",
    idEmpresa: 1
  };

  const elementActive = useAppSelector(
    (state) => state.tablaReducerSucursal.elementActive
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeElementActive());
  };

  useEffect(()=>{
    if (empresaActiva?.id) {
      initialValues.idEmpresa = empresaActiva.id;
    }
  }, [empresaActiva]);

  return (
    <div>
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
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {
            elementActive ? <Modal.Title style={{ color: "white" }}>Editar Sucursal</Modal.Title>
            : <Modal.Title style={{ color: "white" }}>Crear Sucursal</Modal.Title>
          }
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              horarioApertura: Yup.string().required("Campo requerido"),
              horarioCierre: Yup.string().required("Campo requerido"),
              latitud: Yup.number(),
              longitud: Yup.number(),
              domicilio: Yup.object({
                calle: Yup.string(),
                numero: Yup.number(),
                cp: Yup.number(),
                piso: Yup.number(),
                nroDpto: Yup.number(),
              }),
              logo: Yup.string(),
              idEmpresa: Yup.number()
            })}
            initialValues={elementActive ? elementActive : initialValues}
            enableReinitialize={true}
            onSubmit={async (values: ICreateSucursal) => {
              if(!empresaActiva?.id && empresaActiva===0){
                console.error("Error: El ID de la empresa no es válido.", empresaActiva);
                return; 
              }
              values.idEmpresa = empresaActiva.id;
              if (elementActive) {
                await apiSucursal.put(elementActive?.id, values);
              } else {
                values.idEmpresa=empresaActiva.id;
                await apiSucursal.post(values);
              }
              
              handleClose();
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <>
                <Form
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                  }}
                  onSubmit={handleSubmit}
                >
                  <div>
                    <Form.Group className="mb-3" controlId="nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese un nombre aquí"
                        name="nombre"
                        onChange={handleChange}
                        value={values.nombre}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="horarioApertura">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese horario de apertura"
                        name="horarioApertura"
                        onChange={handleChange}
                        value={values.horarioApertura}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="horarioCierre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese horario de clausura"
                        name="horarioCierre"
                        onChange={handleChange}
                        value={values.horarioCierre}
                        autoFocus
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Select aria-label="Default select example" id="pais">
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
                        name="latitud"
                        onChange={handleChange}
                        value={values.latitud}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="longitud">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese longitud"
                        name="longitud"
                        onChange={handleChange}
                        value={values.longitud}
                        autoFocus
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group className="mb-3" controlId="nombreCalle">
                      <Form.Control
                        type="text"
                        placeholder="Nombre de la calle"
                        name="calle"
                        onChange={handleChange}
                        // value={values.}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="numeroDeCalle">
                      <Form.Control
                        type="text"
                        placeholder="Número de la calle"
                        name="horarioApertura"
                        onChange={handleChange}
                        // value={values.calle}
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
                      <Form.Control
                        type="file"
                        name="logo"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <Button variant="danger" onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                      Aceptar
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

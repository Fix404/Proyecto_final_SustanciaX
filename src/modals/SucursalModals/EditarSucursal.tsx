import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeSucursalActiva, setDataSucursalList } from "../../redux/slices/SucursalReducer";
import { SucursalService } from "../../services/ParticularServices/SucursalService";
import { useEffect } from "react";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../../types/dtos/sucursal/IUpdateSucursal";

//const API_URL = import.meta.env.VITE_API_URL;

interface IPropsCreateSucursal {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  sucursalActiva: ISucursal
}

export const EditarSucursal = ({
  openModal,
  setOpenModal,
  sucursalActiva
}: IPropsCreateSucursal) => {
  const empresaActiva=useAppSelector((state)=> state.empresaReducer.empresaActiva!);
  const apiSucursalUpdate= new SucursalService(`/api/sucursales/update`);
  const apiSucursalGet=new SucursalService(`/api`)

  const initialValues:IUpdateSucursal = {
    id:sucursalActiva.id,
    nombre: sucursalActiva.nombre,
  idEmpresa: sucursalActiva.empresa.id,
  eliminado: sucursalActiva.eliminado,
  latitud: sucursalActiva.latitud,
  longitud: sucursalActiva.longitud,
  domicilio: {
    id: sucursalActiva.domicilio.id,
    calle: sucursalActiva.domicilio.calle,
    numero: sucursalActiva.domicilio.numero,
    cp: sucursalActiva.domicilio.cp,
    piso: sucursalActiva.domicilio.piso,
    nroDpto: sucursalActiva.domicilio.nroDpto,
    idLocalidad: 1,
  },
  logo: "",
  categorias: [],
  esCasaMatriz: sucursalActiva.esCasaMatriz,
  horarioApertura: sucursalActiva.horarioApertura,
  horarioCierre: sucursalActiva.horarioCierre
  }


  const dispatch = useAppDispatch();

  const getSucursalesPorEmpresaId = async (id:number) => {
    await apiSucursalGet.getSucursalesPorEmpresaId(id).then((sucursalData) => {
      dispatch(setDataSucursalList(sucursalData));
    });
  };

  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeSucursalActiva());
  };

  useEffect(()=>{
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
        <Modal.Title style={{ color: "white" }}>Editar Sucursal</Modal.Title>
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
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values: IUpdateSucursal)=> {
                await apiSucursalUpdate.put(sucursalActiva!.id, values);
                getSucursalesPorEmpresaId(empresaActiva.id);
                handleClose();}}
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

import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeSucursalActiva, setDataSucursalList } from "../../redux/slices/SucursalReducer";
import { SucursalService } from "../../services/ParticularServices/SucursalService";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../../types/dtos/sucursal/IUpdateSucursal";
import styles from "./SucursalModal.module.css"

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
    id:sucursalActiva?.id,
    nombre: sucursalActiva?.nombre,
  idEmpresa: sucursalActiva?.empresa.id,
  eliminado: sucursalActiva?.eliminado,
  latitud: sucursalActiva?.latitud,
  longitud: sucursalActiva?.longitud,
  domicilio: {
    id: sucursalActiva?.domicilio.id,
    calle: sucursalActiva?.domicilio.calle,
    numero: sucursalActiva?.domicilio.numero,
    cp: sucursalActiva?.domicilio.cp,
    piso: sucursalActiva?.domicilio.piso,
    nroDpto: sucursalActiva?.domicilio.nroDpto,
    idLocalidad: 1,
  },
  logo: "",
  categorias: [],
  esCasaMatriz: sucursalActiva?.esCasaMatriz,
  horarioApertura: sucursalActiva?.horarioApertura,
  horarioCierre: sucursalActiva?.horarioCierre
  }

  const dispatch = useAppDispatch();

  const getSucursalesPorEmpresaId = async (id:number) => {
    await apiSucursalGet.getSucursalesPorEmpresaId(id).then((sucursalData) => {
      dispatch(setDataSucursalList(sucursalData));
    });
  };

  const handleClose = () => {
    setOpenModal(!openModal);
    dispatch(removeSucursalActiva());
  };

  return (
    <div>
      <Modal
        show={openModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        data-bs-theme="dark"
        size="lg"
        id={"modal"}
      >
        <Modal.Header  className={styles.modalSucursalTitulo}>
        <Modal.Title>Editar Sucursal</Modal.Title>
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
                <Form onSubmit={handleSubmit} >
                  <div className={styles.containerSucursalForm}>

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
                        placeholder="Horario de apertura"
                        name="horarioApertura"
                        onChange={handleChange}
                        value={values.horarioApertura}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="horarioCierre">
                      <Form.Control
                        type="text"
                        placeholder="Horario de cierre"
                        name="horarioCierre"
                        onChange={handleChange}
                        value={values.horarioCierre}
                        autoFocus
                      />
                    </Form.Group>

                
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
                        placeholder="Latitud"
                        name="latitud"
                        onChange={handleChange}
                        value={values.latitud === 0? "":values.latitud}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="longitud">
                      <Form.Control
                        type="text"
                        placeholder="Longitud"
                        name="longitud"
                        onChange={handleChange}
                        value={values.longitud === 0?"":values.longitud}
                        autoFocus
                      />
                    </Form.Group>

                   <Form.Group />
                
                    <Form.Group  controlId="nombreCalle">
                      <Form.Control
                        type="text"
                        placeholder="Calle"
                        name="calle"
                        onChange={handleChange}
                        // value={values.}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group  controlId="numeroDeCalle">
                      <Form.Control
                        type="text"
                        placeholder="Altura calle"
                        name="horarioApertura"
                        onChange={handleChange}
                        // value={values.calle}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group  controlId="codigoPostal">
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

                    <Form.Group />
                
                    <Form.Group controlId="imagenSucursal" className={styles.containerImagen}>
                      <Form.Control
                        type="file"
                        name="logo"
                        onChange={handleChange}
                      />
                    </Form.Group>

                  </div>

                  <div className={styles.modalSucursalBotones}>
                    <Button variant="custom" className={styles.sucursalBoton} onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button variant="custom" className={styles.sucursalBoton} type="submit">
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

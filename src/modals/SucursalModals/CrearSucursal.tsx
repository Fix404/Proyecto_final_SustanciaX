import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch} from "../../hooks/redux";
import { ICreateSucursal } from "../../types/dtos/sucursal/ICreateSucursal";
import { SucursalService } from "../../services/ParticularServices/SucursalService";
import { useEffect } from "react";
import { setDataSucursalList } from "../../redux/slices/SucursalReducer";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import styles from "./SucursalModal.module.css"

interface IPropsCreateSucursal {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  empresaActiva: IEmpresa
}

export const CrearSucursal = ({
  openModal,
  setOpenModal,
  empresaActiva
}: IPropsCreateSucursal) => {
  const apiSucursalCreate = new SucursalService(`/api/sucursales/create`);
  const apiSucursalGet=new SucursalService(`api/`);
  const dispatch=useAppDispatch()

  const initialValuesCreate: ICreateSucursal = {
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
    idEmpresa: empresaActiva.id
  };

  const getSucursalesPorEmpresaId = async (id:number) => {
    await apiSucursalGet.getSucursalesPorEmpresaId(id).then((sucursalData) => {
      dispatch(setDataSucursalList(sucursalData));
    });
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(()=>{
    if(empresaActiva){
      getSucursalesPorEmpresaId(empresaActiva.id);
    }
  }, [openModal]);

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
        <Modal.Header
        className={styles.modalSucursalTitulo}
        >
        <Modal.Title>Crear Sucursal</Modal.Title>
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
            initialValues={initialValuesCreate}
            enableReinitialize={true}
            onSubmit={(async (values: ICreateSucursal) => {
                await apiSucursalCreate.post(values);
                handleClose();
            })}
          
          >
            {({ values, handleChange, handleSubmit }) => (
              <>
                <Form  onSubmit={handleSubmit} >

                  <div className={styles.containerSucursalForm}>

                    <Form.Group className="mb-3" controlId="nombre">
                      <Form.Control
                        type="text"
                        placeholder="Nombre de la sucursal"
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
                        value={values.latitud === 0? "" : values.latitud}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="longitud">
                      <Form.Control
                        type="text"
                        placeholder="Longitud"
                        name="longitud"
                        onChange={handleChange}
                        value={values.longitud === 0 ? "" : values.longitud}
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

                    <Form.Group controlId="numeroDeCalle">
                      <Form.Control
                        type="text"
                        placeholder="Altura calle"
                        name="horarioApertura"
                        onChange={handleChange}
                        // value={values.calle}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group controlId="codigoPostal">
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
                        style={{ textAlign: 'center', width: '100%' }}
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

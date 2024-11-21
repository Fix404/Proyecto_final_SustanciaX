import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../hooks/redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { ICreateEmpresaDto } from "../../types/dtos/empresa/ICreateEmpresaDto";
import { EmpresaService } from "../../services/ParticularServices/EmpresaService";
import { removeEmpresaActiva } from "../../redux/slices/EmpresasReducer";
import styles from "./EmpresaModal.module.css"

interface IPropsCreateEmpresa {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  getEmpresas: Function;
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

export const CrearEmpresa = ({
  getEmpresas,
  openModal,
  setOpenModal,
}: IPropsCreateEmpresa) => {
  const initialValues: ICreateEmpresaDto = {
    nombre: "",
    razonSocial: "",
    cuit: 0,
    logo: "",
  };

  const apiEmpresa = new EmpresaService("/api/empresas");

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeEmpresaActiva());
  };
  return (
    <div className={styles.modalCrearEmpresa}>
      <Modal
        show={openModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        data-bs-theme="dark"
        centered
        size="lg"
        id={"modal"}
      >
        <Modal.Header
          className={styles.modalEmpresaTitulo}
        >

          <Modal.Title >Crear Empresa</Modal.Title>

        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              razonSocial: Yup.string().required("Campo requerido"),
              cuit: Yup.string().required("Campo requerido"),
            })}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values: ICreateEmpresaDto) => {
              await apiEmpresa.post(values);
              getEmpresas();
              handleClose();
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <>
                <Form
                  onSubmit={handleSubmit}
                >
                  <div className={styles.modalCrearEmpresaForm}>

                    <div>
                      <Form.Group className="mb-3" controlId="nombre">
                        <Form.Control
                          type="text"
                          placeholder="Nombre de la empresa"
                          autoFocus
                          name="nombre"
                          onChange={handleChange}
                          value={values.nombre}
                        />
                      </Form.Group>
                    </div>

                    <div>
                      <Form.Group className="mb-3" controlId="razonSocial">
                        <Form.Control
                          type="text"
                          placeholder="Razón Social"
                          name="razonSocial"
                          onChange={handleChange}
                          value={values.razonSocial}
                        />
                      </Form.Group>
                    </div>
                    
                    <div>
                      <Form.Group className="mb-3" controlId="cuit">
                        <Form.Control
                          type="text"
                          placeholder="CUIT"
                          name="cuit"
                          onChange={handleChange}
                          value={values.cuit === 0 ? "" : values.cuit} //Cambio para que se vea el placeholder en lugar de un 0
                        />
                      </Form.Group>
                    </div>
                  
                  <div>
                    <Form.Group controlId="imagenEmpresa" className="mb-3">
                      <Form.Label>Suba una imagen</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </div>
                  </div>

                  <div className={styles.modalEmpresaBotones}>
                    <Button variant="custom" className={styles.modalBoton}  onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button variant="custom" className={styles.modalBoton} type="submit">
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

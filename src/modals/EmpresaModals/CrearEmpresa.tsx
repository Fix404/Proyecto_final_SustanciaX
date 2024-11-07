import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { ICreateEmpresaDto } from "../../types/dtos/empresa/ICreateEmpresaDto";
import { EmpresaService } from "../../services/ParticularServices/EmpresaService";
import { removeEmpresaElementActive } from "../../redux/slices/EmpresasReducer";

const API_URL = import.meta.env.VITE_API_URL;

interface IPropsCreateEmpresa {
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
    logo: null,
  };

  const apiEmpresa = new EmpresaService(API_URL + "empresas");

  const elementActive = useAppSelector(
    (state) => state.empresaReducer.elementActive
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeEmpresaElementActive());
  };
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
          closeButton
        >
          {elementActive ? (
            <Modal.Title style={{ color: "white" }}>Editar Empresa</Modal.Title>
          ) : (
            <Modal.Title style={{ color: "white" }}>Crear Empresa</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              razonSocial: Yup.string().required("Campo requerido"),
              cuit: Yup.string().required("Campo requerido"),
            })}
            initialValues={elementActive ? elementActive : initialValues}
            enableReinitialize={true}
            onSubmit={async (values: ICreateEmpresaDto) => {
              if (elementActive) {
                await apiEmpresa.put(elementActive?.id, values);
              } else {
                await apiEmpresa.post(values);
              }
              getEmpresas();
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
                        autoFocus
                        name="nombre"
                        onChange={handleChange}
                        value={values.nombre}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="razonSocial">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su razon social"
                        autoFocus
                        name="razonSocial"
                        onChange={handleChange}
                        value={values.razonSocial}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cuit">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su CUIT"
                        autoFocus
                        name="cuit"
                        onChange={handleChange}
                        value={values.cuit}
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group controlId="imagenEmpresa" className="mb-3">
                      <Form.Label>Suba una imagen</Form.Label>
                      <Form.Control type="file" />
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

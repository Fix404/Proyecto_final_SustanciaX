import { Button, Form, Modal } from "react-bootstrap";
import { IUpdateEmpresaDto } from "../../types/dtos/empresa/IUpdateEmpresaDto";
import { EmpresaService } from "../../services/ParticularServices/EmpresaService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { removeElementActive } from "../../redux/slices/TableReducerSucursal";

interface IPropsUpdateEmpresaDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  getEmpresas: Function;
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

export const EditarEmpresa = ({
  getEmpresas,
  openModal,
  setOpenModal,
}: IPropsUpdateEmpresaDto) => {
  const elementActive = useAppSelector(
    (state) => state.empresaReducer.elementActive
  )!;
  const initialValues: IUpdateEmpresaDto = {
    id: elementActive.id,
    nombre: elementActive.nombre,
    razonSocial: elementActive.razonSocial,
    eliminado: false,
    cuit: elementActive.cuit,
    logo: elementActive.logo,
  };

  const apiEmpresa = new EmpresaService("/api/empresas");
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
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Modal.Title style={{ color: "white" }}>Editar Empresa</Modal.Title>
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
            onSubmit={async (values: IUpdateEmpresaDto) => {
              await apiEmpresa.put(elementActive.id, values);
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
                        placeholder="Ingrese razon social"
                        name="razonSocial"
                        onChange={handleChange}
                        value={values.razonSocial}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cuit">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su CUIT"
                        name="cuit"
                        onChange={handleChange}
                        value={values.cuit}
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group controlId="imagenEmpresa" className="mb-3">
                      <Form.Label>Suba una imagen</Form.Label>
                      <Form.Control
                        type="file"
                        name="logo"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Modal.Footer
                      style={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Button variant="danger" onClick={handleClose}>
                        Cancelar
                      </Button>
                      <Button variant="primary" type="submit">
                        Guardar cambios
                      </Button>
                    </Modal.Footer>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

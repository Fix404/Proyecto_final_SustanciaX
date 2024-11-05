import { Button, Form, Modal } from "react-bootstrap";
import { IUpdateEmpresaDto } from "../../types/dtos/empresa/IUpdateEmpresaDto";
import { EmpresaService } from "../../services/ParticularServices/EmpresaService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeElementActive } from "../../redux/slices/CrearEmpresaReducer";
import { Formik } from "formik";
import * as Yup from "yup";

const API_URL = import.meta.env.VITE_API_URL;

interface IPropsUpdateEmpresaDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  getEmpresas: Function;
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

export const ModificarEmpresas = ({
  getEmpresas,
  openModal,
  setOpenModal,
}: IPropsUpdateEmpresaDto) => {
  const initialValues: IUpdateEmpresaDto = {
    id: 0, 
    nombre: "",
    razonSocial: "",
    eliminado: false, 
    cuit: 0,
    logo: null,
    };

  const apiEmpresa = new EmpresaService(API_URL + "/empresas");

  const elementActive = useAppSelector((state) => state.tablaReducer.elementActive) as IUpdateEmpresaDto | undefined;
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
          <Modal.Title style={{ color: "white" }}>Modificar Empresa</Modal.Title>
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
            onSubmit={async (values: IUpdateEmpresaDto) => {
              if (elementActive) {
                await apiEmpresa.put(values.id, values); 
              }
              getEmpresas();
              handleClose();
            }}
          >
            {() => (
              <>
                <Form style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                  <div>
                    <Form.Group className="mb-3" controlId="nombre">
                      <Form.Control type="text" placeholder="Ingrese un nombre aquí" autoFocus />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="razonSocial">
                      <Form.Control type="text" placeholder="Ingrese razon social" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cuit">
                      <Form.Control type="text" placeholder="Ingrese su CUIT" />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group controlId="imagenEmpresa" className="mb-3">
                      <Form.Label>Suba una imagen</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", alignContent: "center", justifyContent: "space-evenly" }}>
          <Button variant="danger" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" type="submit">Guardar cambios</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

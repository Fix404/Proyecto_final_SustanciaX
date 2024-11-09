import { Button, Form, Modal } from "react-bootstrap";
import { AlergenoService } from "../../../services/ParticularServices/AlergenoService";
import { Formik } from "formik";
import * as Yup from "yup";
import { ICreateAlergeno } from "../../../types/dtos/alergenos/ICreateAlergeno";
import { useAppDispatch } from "../../../hooks/redux";
import { removeAlergenoActivo } from "../../../redux/slices/AlergenoReducer";

interface IPropsCreateAlergeno {
  getAlergenos: Function,
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

export const CrearAlergeno = ({
  getAlergenos,
  openModal,
  setOpenModal
}: IPropsCreateAlergeno) => {
    const initialValues: ICreateAlergeno = {
      denominacion:"",
      imagen:null
    }

    const apiAlergeno = new AlergenoService("/api/alergenos");
    const dispatch=useAppDispatch();

    const handleClose= () =>{
      setOpenModal(false);
      dispatch(removeAlergenoActivo())
    }

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
      <Modal.Title style={{ color: "white" }}>Crear Alérgeno</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Formik
        validationSchema={Yup.object({
          denominacion: Yup.string().required("Campo requerido"),
          // imagen: Yup.string()
        })}
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={async (values: ICreateAlergeno) => {
            await apiAlergeno.post(values);
          getAlergenos();
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
                <Form.Group className="mb-3" controlId="denominacionAlergeno">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese denominación"
                    autoFocus
                    name="denominacion"
                    onChange={handleChange}
                    value={values.denominacion}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="imagenAlergeno" className="mb-3">
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
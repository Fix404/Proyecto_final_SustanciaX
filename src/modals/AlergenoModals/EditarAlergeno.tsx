import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IUpdateAlergeno } from "../../types/dtos/alergenos/IUpdateAlergeno";
import { AlergenoService } from "../../services/ParticularServices/AlergenoService";
import { removeAlergenoActivo } from "../../redux/slices/AlergenoReducer";
import styles from "./AlergenoModal.module.css"


interface IPropsUpdateAlergeno {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  getAlergenos: Function;
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

export const EditarAlergeno = ({
  getAlergenos,
  openModal,
  setOpenModal,
}: IPropsUpdateAlergeno) => {
  const elementActive = useAppSelector(
    (state) => state.alergenoReducer.alergenoActivo
  )!
  const initialValues: IUpdateAlergeno = {
    id: elementActive?.id,
    denominacion: elementActive?.denominacion,
    imagen: elementActive?.imagen
  };

  const apiAlergeno = new AlergenoService("/api/alergenos");
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeAlergenoActivo());
    getAlergenos();
  };

  return (
    <>
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
          className={styles.modalAlergenoTitulo}
        >
          <Modal.Title>Editar Alérgeno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              denominacion: Yup.string().required("Campo requerido"),
              //   imagen: Yup.object()
            })}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values: IUpdateAlergeno) => {
              await apiAlergeno.put(elementActive.id, values);
              getAlergenos();
              handleClose();
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <>
                <Form onSubmit={handleSubmit} >
                  <div className={styles.modalCrearAlergenoForm}>

                    <div>
                      <Form.Group className="mb-3" controlId="denominacion">
                        <Form.Control
                          type="text"
                          placeholder="Denominación"
                          autoFocus
                          name="denominacion"
                          onChange={handleChange}
                          value={values.denominacion}
                        />
                      </Form.Group>
                      </div>

                      <div>
                        <Form.Group controlId="imagenAlergeno" className="mb-3">
                          <Form.Label>Imagen</Form.Label>
                          <Form.Control type="file" />
                        </Form.Group>
                      </div>
                      </div>
                    
              <div className={styles.modalAlergenoBotones}>
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
    </>
  );
};

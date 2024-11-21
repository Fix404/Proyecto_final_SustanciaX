import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IUpdateAlergeno } from "../../types/dtos/alergenos/IUpdateAlergeno";
import { AlergenoService } from "../../services/ParticularServices/AlergenoService";
import { removeAlergenoActivo } from "../../redux/slices/AlergenoReducer";
import styles from "./AlergenoModal.module.css";
import { UploadImage } from "../../components/UploadImage";  // Asegúrate de que este componente maneja la carga de imágenes correctamente.

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
  )!;

  const initialValues: IUpdateAlergeno = {
    id: elementActive?.id,
    denominacion: elementActive?.denominacion,
    imagen: elementActive?.imagen, // Aquí traemos la imagen actual si existe
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
        <Modal.Header className={styles.modalAlergenoTitulo}>
          <Modal.Title>Editar Alérgeno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              denominacion: Yup.string().required("Campo requerido"),
              //   imagen: Yup.object()  // Si es necesario validar la imagen, puedes hacerlo aquí
            })}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values: IUpdateAlergeno) => {
              // Enviamos los datos con la imagen actualizada
              await apiAlergeno.put(elementActive.id, values);
              getAlergenos();
              handleClose();
            }}
          >
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <>
                <Form onSubmit={handleSubmit}>
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

                    {/* Aquí mostramos la imagen si existe */}
                    {values.imagen && (
                      <div>
                        <img
                          src={values.imagen.url} // Mostramos la imagen actual
                          alt="Imagen actual"
                          style={{
                            width: "150px",
                            height: "auto",
                            borderRadius: "8px",
                            marginTop: "10px",
                          }}
                        />
                      </div>
                    )}

                    <div>
                      <Form.Group controlId="imagenAlergeno" className="mb-3">
                        <Form.Label>Imagen</Form.Label>
                        {/* Cargamos la nueva imagen */}
                        <UploadImage
                          setImage={(image) => setFieldValue("imagen", image)} // Establecemos la nueva imagen
                          setImageObjeto={(imageObjeto) => setFieldValue("imagen", imageObjeto?.url)}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className={styles.modalAlergenoBotones}>
                    <Button variant="custom" className={styles.modalBoton} onClick={handleClose}>
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
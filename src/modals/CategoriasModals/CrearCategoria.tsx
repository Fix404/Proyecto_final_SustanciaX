import { Formik } from "formik";
import * as Yup from "yup";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../hooks/redux";
import { removeCategoriaElementActive } from "../../redux/slices/CategoriaReducer";
import { CategoriaService } from "../../services/ParticularServices/CategoriaService";
import { ICreateCategoria } from "../../types/dtos/categorias/ICreateCategoria";
import styles from "./CrearCategoria.module.css"

interface IPropsCreateCategoria {
    getCategorias: Function,
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
}

export const CrearCategoria = ({
        getCategorias,
        openModal,
        setOpenModal
    }: IPropsCreateCategoria) => {
    const initialValues: ICreateCategoria = {
        denominacion: "",
        idEmpresa: 0,
        idCategoriaPadre: 0,
    }

    const apiCategoria = new CategoriaService("api/categorias");
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpenModal(false);
        dispatch(removeCategoriaElementActive())
    }

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
                <Modal.Header className={styles.modalCategoriaTitulo}   >
                    <Modal.Title>Crear Categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={Yup.object({
                            denominacion: Yup.string().required("Campo requerido"),
                        })}
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={async (values: ICreateCategoria) => {
                            await apiCategoria.post(values);
                            getCategorias();
                            handleClose();
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <>
                                <Form onSubmit={handleSubmit} >
                                        <div>
                                            <Form.Group className="mb-3" controlId="denominacionCategoria">
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
                                    <div className={styles.modalCategoriaBotones}>
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
        </div>
    );
};

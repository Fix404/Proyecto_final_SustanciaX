import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IUpdateCategoria } from "../../types/dtos/categorias/IUpdateCategoria";
import { CategoriaService } from "../../services/ParticularServices/CategoriaService";
import { removeCategoriaElementActive } from "../../redux/slices/CategoriaReducer";
import styles from "./CategoriaModal.module.css"

interface IPropsUpdateSubCategoria {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    getSubCategorias: Function;
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
    idCategoriaPadre: number;
    idEmpresa: number;
    idSucursales: number[];
}

export const EditarSubCategoria = ({
    getSubCategorias,
    openModal,
    setOpenModal,
    idCategoriaPadre,
    idEmpresa,
    idSucursales
}: IPropsUpdateSubCategoria) => {
    const categoriaActiva = useAppSelector(
        (state) => state.categoriaReducer.elementActive
    )!;
    const initialValues: IUpdateCategoria = {
        id: categoriaActiva?.id,
        denominacion: categoriaActiva?.denominacion,
        eliminado: categoriaActiva?.eliminado,
        idCategoriaPadre: idCategoriaPadre,
        idSucursales: idSucursales, 
        idEmpresa: idEmpresa, 
    };

    const apiCategoria = new CategoriaService("api/categorias/update");
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpenModal(false);
        dispatch(removeCategoriaElementActive());
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
                    className={styles.modalCategoriaTitulo}
                >
                    <Modal.Title>Editar Sub-Categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={Yup.object({
                            denominacion: Yup.string().required("Campo requerido"),
                        })}
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={async (values: IUpdateCategoria) => {
                            await apiCategoria.put(categoriaActiva.id, values);
                            getSubCategorias();
                            handleClose();
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <>
                                <Form onSubmit={(e) => {
                                    e.stopPropagation();
                                    handleSubmit(e);
                                }} >
                                    <div>
                                        <Form.Group className="mb-3" controlId="denominacion">
                                            <Form.Control
                                                type="text"
                                                placeholder="Denominación"
                                                autoFocus
                                                name="denominacion"
                                                onChange={handleChange}
                                                value={values.denominacion}
                                                onClick={(e) => e.stopPropagation()}
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
        </>
    );
};


import { Button, Form, Modal } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeElementActive } from "../../redux/slices/TableReducer";
import { Formik } from "formik";
import * as Yup from "yup";
import { ICreateProducto } from "../../types/dtos/productos/ICreateProducto";
import { ProductoService } from "../../services/ParticularServices/ProductoService";
import categoriasEjemplo from "../../data/categoriasEjemplo";

const API_URL = import.meta.env.VITE_API_URL;

interface IPropsCrearProducto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    getProductos: Function
    openModal: boolean
    setOpenModal: (state: boolean) => void
}

export const CrearProducto = ({
    getProductos,
    openModal,
    setOpenModal,
}: IPropsCrearProducto) => {
    const initialValues: ICreateProducto = {
        denominacion: "",
        precioVenta: 0,
        descripcion: "",
        habilitado: false,
        codigo: "",
        idCategoria: 0,
        idAlergenos: [],
        imagenes: []
    }

    const apiProducto = new ProductoService(API_URL + "/productos");

    const elementActive = useAppSelector(
        (state) => state.tablaReducer.elementActive);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpenModal(false);
        dispatch(removeElementActive())
    }

    return (
        <>
            <Modal show={openModal} onHide={handleClose} backdrop="static" keyboard={false} data-bs-theme="dark" size="lg" id={"modal"}>
                <Modal.Header style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <Modal.Title style={{ color: "white" }}>Crear Artículo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik validationSchema={Yup.object({
                        denominacion: Yup.string().required("Campo requerido"),
                        precioVenta: Yup.number().required("Campo requerido"),
                        descripcion: Yup.string(),
                        habilitado: Yup.boolean().required("Campo requerido"),
                        codigo: Yup.string().required("Campo requerido"),
                        idCategoria: Yup.number(),
                        idAlergenos: Yup.number()
                    })}
                        initialValues={elementActive ? elementActive : initialValues}
                        enableReinitialize={true}
                        onSubmit={async (values: ICreateProducto) => {
                            if (elementActive) {
                                await apiProducto.post(values);
                            }
                            getProductos();
                            handleClose();
                        }}>
                        {() => (
                            <>
                                <Form style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px" }} >
                                    <div>
                                        <Form.Group className="mb-3" controlId="denominacion">
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese una denominación"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="categoria">
                                            <Form.Select
                                                aria-label="Default select example"
                                                id="categoria"
                                            >
                                                <option>Categoría</option>
                                                {categoriasEjemplo.map((categoria) => (
                                                    <option
                                                        key={categoria.id}
                                                        onClick={() => categoria.denominacion}
                                                    >
                                                        {categoria.denominacion}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="alergenos">
                                            <Form.Select
                                                aria-label="Default select example"
                                                id="categoria"
                                            >
                                                <option>Alergenos</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="precioVenta">
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingresa un precio de venta"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="codigo">
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingresa un código"
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check
                                                label="Habilitado"
                                                type="checkbox"
                                                style={{ color: '#fff' }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div>
                                        <Form.Group>
                                        <Form.Label style={{color: '#fff'}}>Ingrese descripción</Form.Label>
                                        <Form.Control as="textarea" rows={5}/>
                                        </Form.Group>
                                        <Form.Group controlId="imagenEmpresa" className="mb-3">
                                            <Form.Label style={{color: '#fff'}} >Suba una imagen</Form.Label>
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
                    <Button variant="primary" type="submit">Aceptar</Button>
                </Modal.Footer>
            </Modal >
        </>
    )

}


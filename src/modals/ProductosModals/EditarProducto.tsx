import { Button, Form, Modal } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeProductoElementActive } from "../../redux/slices/ProductosReducer";
import { Formik } from "formik";
import * as Yup from "yup";
import { ProductoService } from "../../services/ParticularServices/ProductoService";
import categoriasEjemplo from "../../data/categoriasEjemplo";
import { IUpdateProducto } from "../../types/dtos/productos/IUpdateProducto";

interface IPropsEditarProducto {
    getProductos: Function
    openModal: boolean
    setOpenModal: (state: boolean) => void
}

export const EditarProducto = ({
    getProductos,
    openModal,
    setOpenModal,
}: IPropsEditarProducto) => {
    const dispatch=useAppDispatch();
    const productoActivo=useAppSelector((state) => state.productosReducer.elementActive)!;

    const initialValues: IUpdateProducto = {
        id: productoActivo?.id,
        denominacion: productoActivo?.denominacion,
        precioVenta: productoActivo?.precioVenta,
        descripcion: productoActivo?.descripcion,
        habilitado: productoActivo?.habilitado,
        codigo: productoActivo?.codigo,
        idCategoria: productoActivo?.categoria.id,
        idAlergenos: [],
        imagenes: productoActivo?.imagenes
    }

    const apiProducto = new ProductoService("/api/articulos/update");

    const handleClose = () => {
        setOpenModal(false);
        dispatch(removeProductoElementActive())
    }

    return (
        <>
            <Modal show={openModal} onHide={handleClose} backdrop="static" keyboard={false} data-bs-theme="dark" size="lg" id={"modal"}>
                <Modal.Header style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <Modal.Title style={{ color: "white" }}>Editar Artículo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik validationSchema={Yup.object({
                        denominacion: Yup.string().required("Campo requerido"),
                        precioVenta: Yup.number().required("Campo requerido"),
                        //descripcion: Yup.string(),
                        //habilitado: Yup.boolean().required("Campo requerido"),
                        //codigo: Yup.string().required("Campo requerido"),
                        //idCategoria: Yup.number(),
                        //idAlergenos: Yup.number()
                    })}
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={async (values: IUpdateProducto) => {
                            if (productoActivo) {
                                await apiProducto.put(productoActivo?.id, values);
                            }
                            getProductos();
                            handleClose();
                        }}>
                        {({ values, handleChange, handleSubmit }) => (
                            <>
                                <Form style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px" }} 
                                onSubmit={handleSubmit}>
                                    <div>
                                        <Form.Group className="mb-3" controlId="denominacion">
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese una denominación"
                                                autoFocus
                                                name="denominacion"
                    onChange={handleChange}
                    value={values.denominacion}
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
                                                name="precioVenta"
                    onChange={handleChange}
                    value={values.precioVenta}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="codigo">
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingresa un código"
                                                autoFocus
                                                name="codigo"
                    onChange={handleChange}
                    value={values.codigo}
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
                                        <Modal.Footer style={{ display: "flex", alignContent: "center", justifyContent: "space-evenly" }}>
                    <Button variant="danger" onClick={handleClose}>Cancelar</Button>
                    <Button variant="primary" type="submit">Aceptar</Button>
                </Modal.Footer>
                                    </div>
                                </Form>
                            </>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal >
        </>
    )

}


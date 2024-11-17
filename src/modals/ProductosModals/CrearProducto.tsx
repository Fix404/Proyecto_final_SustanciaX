import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { ICreateProducto } from "../../types/dtos/productos/ICreateProducto";
import { ProductoService } from "../../services/ParticularServices/ProductoService";
import categoriasEjemplo from "../../data/categoriasEjemplo";
import { useAppDispatch } from "../../hooks/redux";
import { removeProductoElementActive } from "../../redux/slices/ProductosReducer";
import styles from "./ProductosModal.module.css"
interface IPropsCrearProducto {
  getProductos: Function;
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
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
    idCategoria: 5,
    idAlergenos: [],
    imagenes: [],
  };

  const apiProducto = new ProductoService("/api/articulos/create");
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeProductoElementActive())
  };

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
        <Modal.Header
          className={styles.modalProductoTitulo}
        >
          <Modal.Title>Crear Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              denominacion: Yup.string().required("Campo requerido"),
              precioVenta: Yup.number().required("Campo requerido"),
              //descripcion: Yup.string(),
              //habilitado: Yup.boolean(),
              //codigo: Yup.string(),
              //idCategoria: Yup.number(),
              //idAlergenos: Yup.number(),
            })}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values: ICreateProducto) => {
              await apiProducto.post(values);
              getProductos();
              handleClose();
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <>
                <Form
                  onSubmit={handleSubmit}
                >
                  <div className={styles.modalCrearProductoForm}>

                    <div className={styles.containerColumnas}>
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
                            <option>Alérgenos</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="precioVenta">
                          <Form.Control
                            type="text"
                            placeholder="Precio"
                            autoFocus
                            name="precioVenta"
                            onChange={handleChange}
                            value={values.precioVenta === 0 ? "" : values.precioVenta}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="codigo">
                          <Form.Control
                            type="text"
                            placeholder="Código"
                            autoFocus
                            name="codigo"
                            onChange={handleChange}
                            value={values.codigo}
                          />
                        </Form.Group>
                      </div>

                      <div>
                        <Form.Group>
                          <Form.Control className="mb-4" as="textarea" rows={5} placeholder="Descripción" />
                        </Form.Group>

                        <Form.Group controlId="imagenEmpresa" className="mb-4">
                          <Form.Control type="file" placeholder="Imagen" />
                        </Form.Group>

                        <Form.Group>
                        <Form.Check
                          label="Habilitado"
                          type="checkbox"
                          style={{ color: "#d4d3d3" }}
                        />
                      </Form.Group>

                      </div>
                    </div>
                   

                    <div className={styles.modalProductoBotones}>
                      <Button variant="custom" className={styles.modalBoton} onClick={handleClose}>
                        Cancelar
                      </Button>
                      <Button variant="custom" className={styles.modalBoton} type="submit">
                        Aceptar
                      </Button>
                    </div>

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

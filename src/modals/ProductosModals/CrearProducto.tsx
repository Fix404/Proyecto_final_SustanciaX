import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { ICreateProducto } from "../../types/dtos/productos/ICreateProducto";
import { ProductoService } from "../../services/ParticularServices/ProductoService";
import categoriasEjemplo from "../../data/categoriasEjemplo";
import { useAppDispatch } from "../../hooks/redux";
import { removeProductoElementActive } from "../../redux/slices/ProductosReducer";

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
    idCategoria: 0,
    idAlergenos: [],
    imagenes: [],
  };

  const apiProducto = new ProductoService("/api/articulos/create");
  const dispatch=useAppDispatch();

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
          <Modal.Title style={{ color: "white" }}>Crear Artículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              denominacion: Yup.string().required("Campo requerido"),
              precioVenta: Yup.number().required("Campo requerido"),
              descripcion: Yup.string(),
              habilitado: Yup.boolean(),
              codigo: Yup.string(),
              idCategoria: Yup.number(),
              idAlergenos: Yup.number(),
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
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "30px",
                  }}
                  onSubmit={handleSubmit}
                >
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
                        <option>Alérgenos</option>
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
                        style={{ color: "#fff" }}
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group>
                      <Form.Label style={{ color: "#fff" }}>
                        Ingrese descripción
                      </Form.Label>
                      <Form.Control as="textarea" rows={5} />
                    </Form.Group>
                    <Form.Group controlId="imagenEmpresa" className="mb-3">
                      <Form.Label style={{ color: "#fff" }}>
                        Suba una imagen
                      </Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                    <div
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

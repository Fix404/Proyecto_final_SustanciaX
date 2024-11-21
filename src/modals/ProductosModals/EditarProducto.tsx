import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeProductoElementActive } from "../../redux/slices/ProductosReducer";
import { Formik } from "formik";
import * as Yup from "yup";
import { ProductoService } from "../../services/ParticularServices/ProductoService";
import { IUpdateProducto } from "../../types/dtos/productos/IUpdateProducto";
import styles from "./ProductosModal.module.css";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import Multiselect from "multiselect-react-dropdown";

interface IPropsEditarProducto {
  getProductos: Function;
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

export const EditarProducto = ({
  getProductos,
  openModal,
  setOpenModal,
}: IPropsEditarProducto) => {
  const dispatch = useAppDispatch();
  const categorias=useAppSelector((state) => state.categoriaReducer.dataList);
  const alergenos=useAppSelector((state) => state.alergenoReducer.alergenosList);
  const productoActivo = useAppSelector(
    (state) => state.productosReducer.elementActive
  )!;

  const initialValues: IUpdateProducto = {
    id: productoActivo?.id,
    denominacion: productoActivo?.denominacion,
    precioVenta: productoActivo?.precioVenta,
    descripcion: productoActivo?.descripcion,
    habilitado: productoActivo?.habilitado,
    codigo: productoActivo?.codigo,
    idCategoria: productoActivo?.categoria.id,
    idAlergenos: productoActivo?.alergenos.map((alergeno:IAlergenos) => alergeno.id),
    imagenes: productoActivo?.imagenes,
  };

  const apiProducto = new ProductoService("/api/articulos/update");

  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeProductoElementActive());
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
        <Modal.Header className={styles.modalProductoTitulo}>
          <Modal.Title>Editar Artículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              denominacion: Yup.string().required("Campo requerido"),
              precioVenta: Yup.number().required("Campo requerido"),
              descripcion: Yup.string(),
              habilitado: Yup.boolean(),
              codigo: Yup.string().required("Campo requerido"),
              //idCategoria: Yup.number(),
              idAlergenos: Yup.array().of(Yup.number())
            })}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values: IUpdateProducto) => {
              await apiProducto.put(productoActivo.id, values);
              getProductos();
              handleClose();
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <>
                <Form onSubmit={handleSubmit}>
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
                            {categorias.map((categoria) => (
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
                          <Form.Label style={{color:"white"}}>Alérgenos:</Form.Label>
                          <Formik
    // Restante configuración de Formik
    initialValues={initialValues}
    onSubmit={async (values: IUpdateProducto) => {
      await apiProducto.post(values);
      getProductos();
      handleClose();
    }}
  >
    {({ values, setFieldValue }) => (
      <>
        <Multiselect
          options={alergenos} // Lista de alérgenos desde Redux
          selectedValues={alergenos.filter((alergeno) =>
            values.idAlergenos.includes(alergeno.id)
          )} // Alérgenos actualmente seleccionados
          displayValue="denominacion" // Campo a mostrar
          onSelect={(selectedList) => {
            const selectedIds = selectedList.map((item:IAlergenos) => item.id);
            setFieldValue("idAlergenos", selectedIds); // Actualiza en Formik
          }}
          onRemove={(selectedList) => {
            const selectedIds = selectedList.map((item:IAlergenos) => item.id);
            setFieldValue("idAlergenos", selectedIds); // Actualiza en Formik
          }}
          placeholder="Seleccione los alérgenos"
          style={{
            multiselectContainer: { color: "black" },
          }}
        />
      </>
    )}
  </Formik>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="precioVenta">
                          <Form.Control
                            type="text"
                            placeholder="Precio"
                            autoFocus
                            name="precioVenta"
                            onChange={handleChange}
                            value={
                              values.precioVenta === 0 ? "" : values.precioVenta
                            }
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
                          <Form.Control
                            className="mb-4"
                            as="textarea"
                            rows={5}
                            placeholder="Descripción"
                            name="descripcion"
                            onChange={handleChange}
                            value={values.descripcion}
                          />
                        </Form.Group>

                        <Form.Group controlId="imagenEmpresa" className="mb-4">
                          <Form.Control type="file" placeholder="Imagen" />
                        </Form.Group>

                        <Form.Group>
                          <Form.Check
                            label="Habilitado"
                            type="checkbox"
                            style={{ color: "#d4d3d3" }}
                            name="habilitado"
                            onChange={handleChange}
                            checked={values.habilitado}
                          />
                        </Form.Group>
                      </div>
                    </div>

                    <div className={styles.modalProductoBotones}>
                      <Button
                        variant="custom"
                        className={styles.modalBoton}
                        onClick={handleClose}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="custom"
                        className={styles.modalBoton}
                        type="submit"
                      >
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
    </>
  );
};

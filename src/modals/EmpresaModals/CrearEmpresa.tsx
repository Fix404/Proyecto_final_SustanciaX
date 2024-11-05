import { Button, Form, Modal} from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeElementActive } from "../../redux/slices/TableReducer";
import { Formik } from "formik";
import * as Yup from "yup";
import { ICreateEmpresaDto } from "../../types/dtos/empresa/ICreateEmpresaDto";
import { EmpresaService } from "../../services/ParticularServices/EmpresaService";


const API_URL=import.meta.env.VITE_API_URL;

interface IPropsCreateEmpresa{
  getEmpresas:Function
  openModal: boolean
  setOpenModal: (state:boolean) => void
}

export const CrearEmpresa = ({
  getEmpresas,
  openModal,
  setOpenModal,
}: IPropsCreateEmpresa) => {
  const initialValues: ICreateEmpresaDto = {
    nombre: "",
  razonSocial: "",
  cuit: 0,
  logo: null,
  }

  const apiEmpresa = new EmpresaService(API_URL + "/empresas");

  const elementActive=useAppSelector(
    (state) => state.tablaReducer.elementActive);
  const dispatch=useAppDispatch();

  const handleClose=() => {
    setOpenModal(false);
    dispatch(removeElementActive())
  }
  return (
    <>
        <Modal show={openModal} onHide={handleClose} backdrop="static" keyboard={false} data-bs-theme="dark" size="lg" id={"modal"}>
          <Modal.Header style={{display:"flex", alignContent:"center", justifyContent:"center"}}>
            <Modal.Title style={{color:"white"}}>Crear Empresa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              razonSocial: Yup.string().required("Campo requerido"),
              cuit: Yup.string().required("Campo requerido"),
              })}
              initialValues={elementActive ? elementActive: initialValues}
              enableReinitialize={true}
              onSubmit={async (values:ICreateEmpresaDto) => {
                if(elementActive){
                  await apiEmpresa.post(values);
                }
                getEmpresas();
                handleClose();
              }}>
                {() => (
                  <>
                  <Form style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)"}} >
                <div>
                <Form.Group className="mb-3" controlId="nombre">
                        <Form.Control
                          type="text"
                          placeholder="Ingrese un nombre aquí"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="razonSocial">
                        <Form.Control
                          type="text"
                          placeholder="Ingrese su razon social"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="cuit">
                        <Form.Control
                          type="text"
                          placeholder="Ingrese su CUIT"
                          autoFocus
                        />
                      </Form.Group>
                </div>
                <div>
                <Form.Group controlId="imagenEmpresa" className="mb-3">
                  <Form.Label>Suba una imagen</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                </div>
              </Form>
                  </>
                )}
            </Formik>
          </Modal.Body>
          <Modal.Footer style={{display:"flex", alignContent:"center", justifyContent:"space-evenly"}}>
            <Button variant="danger" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" type="submit">Aceptar</Button>
          </Modal.Footer>
        </Modal>
    </>
  )

}


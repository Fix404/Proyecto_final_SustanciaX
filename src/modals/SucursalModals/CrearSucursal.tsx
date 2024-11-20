import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch} from "../../hooks/redux";
import { ICreateSucursal } from "../../types/dtos/sucursal/ICreateSucursal";
import { SucursalService } from "../../services/ParticularServices/SucursalService";
import { useEffect, useState } from "react";
import { setDataSucursalList } from "../../redux/slices/SucursalReducer";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import styles from "./SucursalModal.module.css"
import { PaisService } from "../../services/ParticularServices/PaisService";
import { IPais } from "../../types/IPais";
import { IProvincia } from "../../types/IProvincia";
import { ProvinciaService } from "../../services/ParticularServices/ProvinciaService";
import { LocalidadService } from "../../services/ParticularServices/LocalidadService";
import { ILocalidad } from "../../types/ILocalidad";

interface IPropsCreateSucursal {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  empresaActiva: IEmpresa
}

export const CrearSucursal = ({
  openModal,
  setOpenModal,
  empresaActiva
}: IPropsCreateSucursal) => {
  const [paises, setPaises]=useState<IPais[]>([]);
  const [provs, setProvs]=useState<IProvincia[]>([]);
  const [localidades, setLocalidades]=useState<ILocalidad[]>([]);
  const apiSucursalCreate = new SucursalService(`/api/sucursales/create`);
  const apiSucursalGet=new SucursalService(`api/`);
  const apiPaisGet=new PaisService("/api/paises");
  const dispatch=useAppDispatch();

  const initialValuesCreate: ICreateSucursal = {
    nombre: "",
    horarioApertura: "",
    horarioCierre: "",
    esCasaMatriz: false,
    latitud: 0,
    longitud: 0,
    domicilio: {
      idLocalidad:1,
      calle: "",
      numero: 0,
      cp: 0,
      piso: 0,
      nroDpto: 0,
    },
    logo: "",
    idEmpresa: empresaActiva.id
  };

  const getSucursalesPorEmpresaId = async (id:number) => {
    await apiSucursalGet.getSucursalesPorEmpresaId(id).then((sucursalData) => {
      dispatch(setDataSucursalList(sucursalData));
    });
  };

  const getPaises = async () => {
    await apiPaisGet.getAll().then((paisesData) => 
    setPaises(paisesData))
  }

  const handleProvs = async (paisId:number) => {
    const apiProvGetById=new ProvinciaService(`/api/`);
      await apiProvGetById.getProvinciasPorPaisId(paisId).then((provsData) => 
        setProvs(provsData)
      )
  }

  const handleLocalidades = async (provId:number) => {
    const apiLocalidGetById=new LocalidadService(`/api/`);
    await apiLocalidGetById.getlocalidadesPorProvId(provId).then((localidData)=>{
      setLocalidades(localidData);
    })
  }

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(()=>{
    if(empresaActiva){
      getSucursalesPorEmpresaId(empresaActiva.id);
    }
  }, [openModal]);

  useEffect(()=> {
    getPaises()
  }, [])

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
        className={styles.modalSucursalTitulo}
        >
        <Modal.Title>Crear Sucursal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              horarioApertura: Yup.string().required("Campo requerido"),
              horarioCierre: Yup.string().required("Campo requerido"),
              latitud: Yup.number(),
              longitud: Yup.number(),
              domicilio: Yup.object({
                calle: Yup.string().required("Campo requerido"),
                numero: Yup.number(),
                cp: Yup.number(),
                piso: Yup.number().notRequired(),
                nroDpto: Yup.number().notRequired(),
              }),
              logo: Yup.string(),
              idEmpresa: Yup.number()
            })}
            initialValues={initialValuesCreate}
            enableReinitialize={true}
            onSubmit={(async (values: ICreateSucursal) => {
                await apiSucursalCreate.post(values);
                handleClose();
            })}
          
          >
            {({ values, handleChange, handleSubmit }) => (
              <>
                <Form  onSubmit={handleSubmit} >

                  <div className={styles.containerSucursalForm}>

                    <Form.Group className="mb-3" controlId="nombre">
                      <Form.Control
                        type="text"
                        placeholder="Nombre de la sucursal"
                        name="nombre"
                        onChange={handleChange}
                        value={values.nombre}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="horarioApertura">
                      <Form.Control
                        type="text"
                        placeholder="Horario de apertura"
                        name="horarioApertura"
                        onChange={handleChange}
                        value={values.horarioApertura}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="horarioCierre">
                      <Form.Control
                        type="text"
                        placeholder="Horario de cierre"
                        name="horarioCierre"
                        onChange={handleChange}
                        value={values.horarioCierre}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Select aria-label="Default select example" id="pais" onChange={(e) => {
    const paisId = Number(e.target.value);
    if (paisId) handleProvs(paisId);
  }}>
                      <option>País</option>
                      {paises.map((pais, index) => (
                        <option key={index} value={pais.id}>{pais.nombre}</option>
                      ))}
                    </Form.Select>
                    <Form.Select
                      aria-label="Default select example"
                      id="provincia"
                      onChange={(e) => {
                        const provId = Number(e.target.value);
                        if (provId) handleLocalidades(provId);
                      }}
                    >
                      <option>Provincia</option>
                     {provs.map((prov, index) => (
                      <option key={index} value={prov.id}>{prov.nombre}</option>
                     ))}
                    </Form.Select>
                    <Form.Select
                      aria-label="Default select example"
                      id="localidad"
                    >
                      <option>Localidad</option>
                      {localidades.map((localid, index) => (
                        <option key={index} value={localid.id}>{localid.nombre}</option>
                      ))}
                    </Form.Select>

                    <Form.Group className="mb-3" controlId="latitud">
                      <Form.Control
                        type="text"
                        placeholder="Latitud"
                        name="latitud"
                        onChange={handleChange}
                        value={values.latitud === 0 ? "" : values.latitud}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="longitud">
                      <Form.Control
                        type="text"
                        placeholder="Longitud"
                        name="longitud"
                        onChange={handleChange}
                        value={values.longitud === 0 ? "" : values.longitud}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group />

                    <Form.Group  controlId="nombreCalle">
                      <Form.Control
                        type="text"
                        placeholder="Calle"
                        name="domicilio.calle"
                        onChange={handleChange}
                        value={values.domicilio.calle}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group controlId="numeroDeCalle">
                      <Form.Control
                        type="text"
                        placeholder="Altura calle"
                        name="domicilio.numero"
                        onChange={handleChange}
                        value={values.domicilio.numero}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group controlId="codigoPostal">
                      <Form.Control
                        type="text"
                        placeholder="Código Postal"
                        name="domicilio.cp"
                        onChange={handleChange}
                        value={values.domicilio.cp}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="numeroDePiso">
                      <Form.Control
                        type="text"
                        placeholder="Número de piso"
                        name="domicilio.piso"
                        onChange={handleChange}
                        value={values.domicilio.piso}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="numeroDeDepartamento"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Número de departamento"
                        name="domicilio.nroDpto"
                        onChange={handleChange}
                        value={values.domicilio.nroDpto}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group />
                 
                    <Form.Group controlId="imagenSucursal" className={styles.containerImagen}>
                      <Form.Control
                        type="file"
                        name="logo"
                        onChange={handleChange}
                        style={{ textAlign: 'center', width: '100%' }}
                      />
                    </Form.Group>
                  </div>

                  <div className={styles.modalSucursalBotones}>
                    <Button variant="custom" className={styles.sucursalBoton} onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button variant="custom" className={styles.sucursalBoton} type="submit">
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

import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  removeSucursalActiva,
  setDataSucursalList,
} from "../../redux/slices/SucursalReducer";
import { SucursalService } from "../../services/ParticularServices/SucursalService";
import { IUpdateSucursal } from "../../types/dtos/sucursal/IUpdateSucursal";
import styles from "./SucursalModal.module.css";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { useEffect, useState } from "react";
import { IPais } from "../../types/IPais";
import { IProvincia } from "../../types/IProvincia";
import { ILocalidad } from "../../types/ILocalidad";
import { PaisService } from "../../services/ParticularServices/PaisService";
import { ProvinciaService } from "../../services/ParticularServices/ProvinciaService";
import { LocalidadService } from "../../services/ParticularServices/LocalidadService";

interface IPropsUpdateSucursal {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  getSucursales: Function;
  sucursal: ISucursal;
}

export const EditarSucursal = ({
  openModal,
  setOpenModal,
  getSucursales,
  sucursal,
}: IPropsUpdateSucursal) => {
  const empresaActiva = useAppSelector(
    (state) => state.empresaReducer.empresaActiva!
  );
  const apiSucursalUpdate = new SucursalService(`/api/sucursales/update`);
  const apiSucursalGet = new SucursalService(`/api`);
  const [paises, setPaises] = useState<IPais[]>([]);
  const [provs, setProvs] = useState<IProvincia[]>([]);
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
  const apiPaisGet = new PaisService("/api/paises");
  const dispatch = useAppDispatch();

  const initialValues: IUpdateSucursal = {
    id: sucursal?.id,
    nombre: sucursal?.nombre,
    idEmpresa: sucursal?.empresa.id,
    eliminado: sucursal?.eliminado,
    latitud: sucursal?.latitud,
    longitud: sucursal?.longitud,
    domicilio: {
      id: sucursal?.domicilio?.id,
      calle: sucursal?.domicilio?.calle,
      numero: sucursal?.domicilio?.numero,
      cp: sucursal?.domicilio?.cp,
      piso: sucursal?.domicilio?.piso,
      nroDpto: sucursal?.domicilio?.nroDpto,
      idLocalidad: sucursal?.domicilio?.localidad?.id,
    },
    logo: "",
    categorias: [],
    esCasaMatriz: sucursal?.esCasaMatriz,
    horarioApertura: sucursal?.horarioApertura,
    horarioCierre: sucursal?.horarioCierre,
  };

  const getSucursalesPorEmpresaId = async (id: number) => {
    await apiSucursalGet.getSucursalesPorEmpresaId(id).then((sucursalData) => {
      dispatch(setDataSucursalList(sucursalData));
    });
  };

  const getPaises = async () => {
    await apiPaisGet.getAll().then((paisesData) => setPaises(paisesData));
  };

  const handleProvs = async (paisId: number) => {
    const apiProvGetById = new ProvinciaService(`/api/`);
    await apiProvGetById
      .getProvinciasPorPaisId(paisId)
      .then((provsData) => setProvs(provsData));
  };

  const handleLocalidades = async (provId: number) => {
    const apiLocalidGetById = new LocalidadService(`/api/`);
    await apiLocalidGetById
      .getlocalidadesPorProvId(provId)
      .then((localidData) => {
        setLocalidades(localidData);
      });
  };

  const handleClose = () => {
    setOpenModal(!openModal);
    dispatch(removeSucursalActiva());
    getSucursales();
  };

  useEffect(() => {
    getPaises();
  }, []);

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
        <Modal.Header className={styles.modalSucursalTitulo}>
          <Modal.Title>Editar Sucursal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              nombre: Yup.string(),
              horarioApertura: Yup.string(),
              horarioCierre: Yup.string(),
              latitud: Yup.number(),
              longitud: Yup.number(),
              domicilio: Yup.object({
                calle: Yup.string(),
                numero: Yup.number(),
                cp: Yup.number(),
                piso: Yup.number(),
                nroDpto: Yup.number(),
                idLocalidad: Yup.number()
              }),
              logo: Yup.string(),
              idEmpresa: Yup.number(),

            })}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values: IUpdateSucursal) => {
              await apiSucursalUpdate.put(sucursal!.id, values);
              getSucursalesPorEmpresaId(empresaActiva.id);
              handleClose();
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <>
                <Form onSubmit={handleSubmit}>
                  <div className={styles.containerSucursalForm}>
                    <Form.Group className="mb-3" controlId="nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese un nombre aquí"
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

                    <Form.Select
                      aria-label="Default select example"
                      id="pais"
                      onChange={(e) => {
                        const paisId = Number(e.target.value);
                        if (paisId) handleProvs(paisId);
                      }}
                      name="sucursal.domicilio.localidad.provincia.pais.id"
                      value={sucursal.domicilio.localidad.provincia.pais.id}
                    >
                      <option>
                        {sucursal.domicilio.localidad.provincia.pais.nombre}
                      </option>
                      {paises.map((pais, index) => (
                        <option key={index} value={pais.id}>
                          {pais.nombre}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Select
                      aria-label="Default select example"
                      id="provincia"
                      onChange={(e) => {
                        const provId = Number(e.target.value);
                        if (provId) handleLocalidades(provId);
                      }}
                      name="sucursal.domicilio.localidad.provincia.id"
                      value={sucursal.domicilio.localidad.provincia.id}
                    >
                      <option>
                        {sucursal.domicilio.localidad.provincia.nombre}
                      </option>
                      {provs.map((prov, index) => (
                        <option key={index} value={prov.id}>
                          {prov.nombre}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Select
                      aria-label="Default select example"
                      id="localidad"
                      name="sucursal.domicilio.idLocalidad"
                      value={values.domicilio.idLocalidad}
                      onChange={handleChange}
                    >
                      <option>{sucursal.domicilio.localidad.nombre}</option>
                      {localidades.map((localid, index) => (
                        <option key={index} value={localid.id}>
                          {localid.nombre}
                        </option>
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

                    <Form.Group controlId="nombreCalle">
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

                    <Form.Group
                      controlId="imagenSucursal"
                      className={styles.containerImagen}
                    >
                      <Form.Control
                        type="file"
                        name="logo"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>

                  <div className={styles.modalSucursalBotones}>
                    <Button
                      variant="custom"
                      className={styles.sucursalBoton}
                      onClick={handleClose}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="custom"
                      className={styles.sucursalBoton}
                      type="submit"
                    >
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

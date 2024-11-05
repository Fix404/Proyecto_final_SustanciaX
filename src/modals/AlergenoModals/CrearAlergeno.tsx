import React, { FC } from "react";
import styles from "./CrearAlergeno.module.css";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { Button } from "react-bootstrap";
import { ServiceAlergeno } from "../../services/ParticularServices/AlergenoService";

interface IProps {
  onClose: () => void | null;
  alergeno: IAlergenos | null;
  editar?: boolean;
  onAddAlergeno: (alergeno: IAlergenos) => void;
}

export const CrearAlergeno: FC<IProps> = ({
  onClose,
  onAddAlergeno,
  alergeno,
  editar,
}) => {
  const { values, handleChange, resetForm } = useForm({
    denominacion: editar && alergeno ? alergeno.denominacion : "",
    imagen: {
      url: editar && alergeno?.imagen.url ? alergeno.imagen.url : "",
      name: editar && alergeno?.imagen.name ? alergeno.imagen.name : "",
    },
  });
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nuevoAlergeno: IAlergenos = {
      id: editar && alergeno ? alergeno.id : Date.now(),
      denominacion: values.denominacion,
      imagen: {
        url: values.imagen.url,
        name: values.imagen.name,
      },
    };

    const serviceAlergeno = new ServiceAlergeno();
    try {
      if (editar && alergeno) {
        await serviceAlergeno.editAlergeno(alergeno.id, nuevoAlergeno);
        okAlergeno2();
      } else {
        await serviceAlergeno.createAlergeno(nuevoAlergeno);
        okAlergeno();
      }

      const alergenosActualizados = await serviceAlergeno.getAllAlergenos();
      onAddAlergeno(alergenosActualizados.data); 
      onClose();
    } catch (error) {
      badContest();
      console.error("Error al guardar el alergeno", error);
    }
  
    resetForm();
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.modalAlergeno}>
        <div className={styles.contentTittle}>
          {editar && alergeno ? (
            <h2>Editar Alergeno</h2>
          ) : (
            <h2>Crear Alergeno</h2>
          )}
          <div className={styles.contentbutton}>
            <CancelButton onClick={onClose} />
          </div>
        </div>
        <form className={styles.formCrearAlergeno} onSubmit={handleSubmit}>
          <div className={styles.contentInputs}>
            <input
              type="text"
              name="denominacion"
              placeholder="Ingresa una denominacion"
              value={values.denominacion}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.imgContainer}>
          <input
            type="text"
            name="imagen"
            placeholder="Agrega una Imagen"
            value={values.imagen.url}
            onChange={handleChange}
          />
          </div>

          <Button type="submit" variant="outline-success">
            Confirmar
          </Button>
        </form>
      </div>
    </div>
  );
};
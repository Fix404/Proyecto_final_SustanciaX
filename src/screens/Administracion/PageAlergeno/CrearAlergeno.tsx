import React, { FC, useState } from "react";
import styles from "./CrearAlergeno.module.css";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { Button } from "react-bootstrap";
import { ServiceAlergeno } from "../../../services/ParticularServices/AlergenoService";

interface IProps {
  onClose: () => void;
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
  const [denominacion, setDenominacion] = useState(
    editar && alergeno ? alergeno.denominacion : ""
  );
  const [imagenUrl, setImagenUrl] = useState(
    editar && alergeno?.imagen.url ? alergeno.imagen.url : ""
  );
  const [imagenName, setImagenName] = useState(
    editar && alergeno?.imagen.name ? alergeno.imagen.name : ""
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nuevoAlergeno: IAlergenos = {
      id: editar && alergeno ? alergeno.id : Date.now(),
      denominacion,
      imagen: {
        url: imagenUrl,
        name: imagenName,
      },
    };

    const serviceAlergeno = new ServiceAlergeno();
    try {
      if (editar && alergeno) {
        await serviceAlergeno.editAlergeno(alergeno.id, nuevoAlergeno);
        alert("Alergeno editado con éxito");
        onAddAlergeno(nuevoAlergeno); // Pasa el alergeno editado
      } else {
        await serviceAlergeno.createAlergeno(nuevoAlergeno);
        alert("Alergeno creado con éxito");
        onAddAlergeno(nuevoAlergeno); // Pasa el nuevo alergeno creado
      }

      onClose(); // Cierra el modal después de crear o editar
    } catch (error) {
      alert("Hubo un error al guardar el alergeno");
      console.error("Error al guardar el alergeno", error);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.modalAlergeno}>
        <div className={styles.contentTittle}>
          {editar && alergeno ? <h2>Editar Alergeno</h2> : <h2>Crear Alergeno</h2>}
          <div className={styles.contentbutton}>
            <Button variant="outline-secondary" onClick={onClose}>Cancelar</Button>
          </div>
        </div>
        <form className={styles.formCrearAlergeno} onSubmit={handleSubmit}>
          <div className={styles.contentInputs}>
            <input
              type="text"
              name="denominacion"
              placeholder="Ingresa una denominación"
              value={denominacion}
              onChange={(e) => setDenominacion(e.target.value)}
              required
            />
          </div>
          <div className={styles.imgContainer}>
            <input
              type="text"
              name="imagen"
              placeholder="Agrega una Imagen"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
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
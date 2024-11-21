import styles from "./AlergenoModal.module.css";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import noImage from "../../assets/images/noImage.jpeg"; // Importamos la imagen por defecto

interface AlergenosModalProps {
  alergeno: IAlergenos;
}

export const VerAlergeno: React.FC<AlergenosModalProps> = ({ alergeno }) => {
  const [esVisible, setEsVisible] = useState(true);

  const onClose = () => {
    setEsVisible(false);
  };

  if (!esVisible) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div
        className="modal show"
        style={{
          display: "block",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Modal.Dialog className={styles.containerModal}>
          <Modal.Header>
            <Modal.Title style={{ textAlign: "center", width: "100%" }}>
              Alérgeno
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>
              <b>Denominación: </b> {alergeno?.denominacion}
            </p>
            {/* Verificamos si existe la imagen y si es un objeto IImagen, luego mostramos la imagen */}
            {alergeno?.imagen ? (
              <div>
                <b>Imagen:</b>
                <img
                  src={alergeno.imagen.url} // Accedemos correctamente a la propiedad 'url' del objeto IImagen
                  alt={alergeno?.denominacion}
                  style={{
                    width: "150px",
                    height: "auto",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
              </div>
            ) : (
              <div>
                <b>Imagen:</b>
                <img
                  src={noImage} // Si no hay imagen, mostramos la imagen por defecto
                  alt="Imagen no disponible"
                  style={{
                    width: "150px",
                    height: "auto",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant="custom"
              className={styles.modalBoton}
              onClick={onClose}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};
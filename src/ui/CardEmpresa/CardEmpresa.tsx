import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import { FC } from "react";
import { useAppDispatch } from "../../hooks/redux";
import {
  removeEmpresaElementActive,
  setEmpresaElementActive,
} from "../../redux/slices/EmpresasReducer";
import styles from "./CardEmpresa.module.css";

interface ICardEmpresa {
  empresa: IEmpresa;
}

export const CardEmpresa: FC<ICardEmpresa> = ({ empresa }) => {
  const dispatch = useAppDispatch();
  const handleEmpresaActiva = () => {
    dispatch(removeEmpresaElementActive());
    dispatch(setEmpresaElementActive({ element: empresa }));
  };
  return (
    <>
      {empresa && (
        <div>
          <Card style={{ width: "12rem" }} onClick={handleEmpresaActiva}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{empresa.nombre}</Card.Title>
              <Card.Text>
                {empresa.cuit}
                <br />
                {empresa.razonSocial}
              </Card.Text>
              <Card.Footer className={styles.cardEmpresaFooterContainer}>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip-edit-empresa">
                      Editar Empresa
                    </Tooltip>
                  }
                >
                  <Button variant="primary">
                    <span className="material-symbols-outlined">edit</span>
                  </Button>
                </OverlayTrigger>
                <br />
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip-delete-empresa">
                      Eliminar Empresa
                    </Tooltip>
                  }
                >
                  <Button variant="danger">
                    <span className="material-symbols-outlined">delete</span>
                  </Button>
                </OverlayTrigger>
              </Card.Footer>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

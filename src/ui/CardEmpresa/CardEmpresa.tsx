import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import { FC, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import {
  removeEmpresaActiva,
  setDataEmpresaList,
  setEmpresaActiva,
} from "../../redux/slices/EmpresasReducer";
import styles from "./CardEmpresa.module.css";
import { EditarEmpresa } from "../../modals/EmpresaModals/EditarEmpresa";
import { EmpresaService } from "../../services/ParticularServices/EmpresaService";

interface ICardEmpresa {
  empresa: IEmpresa;
}

export const CardEmpresa: FC<ICardEmpresa> = ({ empresa }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const empresaService = new EmpresaService(`api/empresas`);
  const handleEmpresaActiva = () => {
    dispatch(removeEmpresaActiva());
    dispatch(setEmpresaActiva({ element: empresa }));
  };

  const getEmpresas = async () => {
    await empresaService.getAll().then((empresasData) => {
      dispatch(setDataEmpresaList(empresasData))
    })
  }


  const toggleModal = () => {
    setOpenModal(!openModal);
    getEmpresas();
  };

  return (
    <>
      {empresa && (
        <div>
          <Card className={styles.containerCardEmpresa} onClick={handleEmpresaActiva}>

            <Card.Body>
              <Card.Title>{empresa.nombre}</Card.Title>
            </Card.Body>

            <Card.Footer className={styles.cardEmpresaFooterContainer}>

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id="button-tooltip-delete-empresa">
                    Ver
                  </Tooltip>
                }
              >
                <Button variant="custom" className={styles.botonEmpresaHome}>
                  <span className="material-symbols-outlined">visibility</span>
                </Button>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id="button-tooltip-edit-empresa">
                    Editar 
                  </Tooltip>
                }
              >
                <Button variant="custom" className={styles.botonEmpresaHome} onClick={toggleModal}>
                  <span className="material-symbols-outlined">edit</span>
                </Button>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id="button-tooltip-delete-empresa">
                    Eliminar 
                  </Tooltip>
                }
              >
                <Button variant="custom" className={styles.botonEmpresaHome}>
                  <span className="material-symbols-outlined">delete</span>
                </Button>
              </OverlayTrigger>

            </Card.Footer>

          </Card>
          {openModal && <EditarEmpresa openModal={openModal} setOpenModal={setOpenModal} getEmpresas={getEmpresas} />}
        </div>
      )}
    </>
  );
};

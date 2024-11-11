import { FC, useEffect, useState } from "react";
import styles from "./AlergenoItem.module.css";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeAlergenoActivo, setAlergenoActivo } from "../../redux/slices/AlergenoReducer";
import { EditarAlergeno } from "../../modals/AlergenoModals/EditarAlergeno/EditarAlergeno";
import { AlergenoService } from "../../services/ParticularServices/AlergenoService";
import { VerAlergeno } from "../../modals/AlergenoModals/VerAlergeno/VerAlergeno";
import { DeleteAlergeno } from "../../alerts/DeleteAlergenoAlert/DeleteAlergeno";

interface IAlergenosItem {
    alergeno: IAlergenos;
}

export const AlergenoItem: FC<IAlergenosItem> = ({ alergeno }) => {
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalVer, setOpenModalVer] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const dispatch=useAppDispatch();

    const alergenoService= new AlergenoService("api/alergenos");

    const handleEditarAlergeno = () => {
        dispatch(removeAlergenoActivo());
        dispatch(setAlergenoActivo({element:alergeno}));
        setOpenModalEdit(!openModalEdit)
      }
    
      const handleVerAlergeno = () => {
        dispatch(removeAlergenoActivo());
        dispatch(setAlergenoActivo({element:alergeno}));
        setOpenModalVer(!openModalVer)
      }

      const handleDeleteAlergeno = () => {
        dispatch(removeAlergenoActivo());
        dispatch(setAlergenoActivo({element:alergeno}));
        setOpenModalDelete(!openModalDelete)
      }

      const getAlergenos = async () => {
        await alergenoService.getAll().then(() => {
            dispatch(setAlergenoActivo({element:alergeno}))
        });
      }

      const alergenoActivo=useAppSelector((state) => state.alergenoReducer.alergenoActivo);

      // useEffect(() => {
      //   if(!openModalEdit || !openModalVer){
      //       getAlergenos()
      //   }
      // }, [openModalEdit, openModalVer])

    return (
        <div className={styles.itemContainer}>
            <div className={styles.productoContainer}>
                <p>{`${alergeno.denominacion}`}</p>
                <p>{`${alergeno.imagen}`}</p>
            </div>
            <div className={styles.accionesContainer}>
            <OverlayTrigger  placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-ver">Ver Alérgeno</Tooltip>
            }>
          <Button variant="primary" onClick={handleVerAlergeno}>
            <span className="material-symbols-outlined" style={{ color: "#ffb600" }}>table_eye</span>
          </Button>
          </OverlayTrigger>
          <OverlayTrigger  placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-ver">Editar Alérgeno</Tooltip>
            }>
          <Button variant="primary" onClick={handleEditarAlergeno}>
            <span className="material-symbols-outlined" style={{ color: "#3e6d88" }}>edit</span>
          </Button>
          </OverlayTrigger>
          <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip-delete-empresa">
                      Eliminar Alérgeno
                    </Tooltip>
                  }
                >
                  <Button variant="danger" onClick={handleDeleteAlergeno}>
                    <span className="material-symbols-outlined" style={{ color: "#933631" }}>delete</span>
                  </Button>
                </OverlayTrigger>
            </div>
            {openModalEdit && <EditarAlergeno getAlergenos={getAlergenos} openModal={openModalEdit} setOpenModal={setOpenModalEdit} />}
            {openModalVer && <VerAlergeno alergeno={alergenoActivo!}/>}
            {openModalDelete && <DeleteAlergeno getAlergenos={getAlergenos} alergenoActivo={alergenoActivo!}/>}
        </div>
    );
}
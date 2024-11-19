import { FC, useEffect } from "react";
import Swal from "sweetalert2"
import { AlergenoService } from "../../services/ParticularServices/AlergenoService";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { useAppDispatch } from "../../hooks/redux";
import { removeAlergenoActivo } from "../../redux/slices/AlergenoReducer";

interface IPropsDeleteAlergeno{
    getAlergenos: Function,
    alergenoActivo:IAlergenos
}

export const DeleteAlergeno:FC<IPropsDeleteAlergeno> = ({getAlergenos, alergenoActivo}) => {
    const apiAlergeno=new AlergenoService("api/alergenos/");
    const dispatch=useAppDispatch();
    const deleteAlergeno = async () => {
        await apiAlergeno.delete(alergenoActivo.id).then(() => {
            getAlergenos();
        })
    }

    useEffect(() => {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "El alérgeno se eliminará permanentemente",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            deleteAlergeno().then(() => {
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "El alérgeno ha sido eliminado.",
                    icon: "success",
                  });
            })
          }
          dispatch(removeAlergenoActivo())
          getAlergenos();
        });
      }, []);
  return (
    <>
    </>
  )
}

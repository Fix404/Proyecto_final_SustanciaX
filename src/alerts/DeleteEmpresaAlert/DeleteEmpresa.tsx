import { FC, useEffect } from "react";
import Swal from "sweetalert2"

interface IPropsDeleteEmpresa{
    getEmpresas: Function,
}

export const DeleteEmpresa:FC<IPropsDeleteEmpresa> = ({getEmpresas}) => {

    useEffect(() => {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "La empresa se eliminará permanentemente",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar"
        }).then((result) => {
            if(result.isConfirmed){
                Swal.fire({
                    title: "¡Eliminado!...???",
                    text: "La empresa no ha sido eliminada en absoluto, ¿Creía que este botón hacía algo? jaajajajajjaaja",
                    icon: "success",
                  });
            }
          getEmpresas();
        });
      }, []);
  return (
    <>
    </>
  )
}

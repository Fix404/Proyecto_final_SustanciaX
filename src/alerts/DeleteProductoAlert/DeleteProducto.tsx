import { FC, useEffect } from "react";
import Swal from "sweetalert2"
import { IProductos } from "../../types/dtos/productos/IProductos";
import { ProductoService } from "../../services/ParticularServices/ProductoService";

interface IPropsDeleteProducto{
    getProductos: Function,
    productoActivo:IProductos
}

export const DeleteProducto:FC<IPropsDeleteProducto> = ({getProductos, productoActivo}) => {
    const apiProducto=new ProductoService("api/articulos");
    const deleteProducto = async () => {
        await apiProducto.delete(productoActivo.id).then(() => {
            getProductos();
        })
    }

    useEffect(() => {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "El producto se eliminará permanentemente",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            deleteProducto().then(() => {
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "El producto ha sido eliminado.",
                    icon: "success",
                  });
            })
          }
        });
      }, []);
  return (
    <>
    </>
  )
}

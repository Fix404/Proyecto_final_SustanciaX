import { FC, useEffect, useState } from "react";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import styles from "./ProductoItem.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { ProductoService } from "../../../services/ParticularServices/ProductoService";
import { removeProductoElementActive, setProductoElementActive } from "../../../redux/slices/ProductosReducer";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { EditarProducto } from "../../../modals/ProductosModals/EditarProducto";
import { VerProducto } from "../../../modals/ProductosModals/VerProducto/VerProducto";
import { DeleteProducto } from "../../../alerts/DeleteProductoAlert/DeleteProducto";

interface IProductosItem {
    producto: IProductos;
}

export const ProductoItem: FC<IProductosItem> = ({ producto }) => {
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalVer, setOpenModalVer] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const dispatch=useAppDispatch();
    const productosService=new ProductoService("api/articulos");

    const handleEditarProducto = () => {
        dispatch(removeProductoElementActive());
        dispatch(setProductoElementActive({element:producto}));
        setOpenModalEdit(!openModalEdit)
    }

    const handleVerProducto = () => {
        dispatch(removeProductoElementActive());
        dispatch(setProductoElementActive({element:producto}));
        setOpenModalVer(!openModalVer)
      }

    const handleDeleteProducto = () => {
      dispatch(removeProductoElementActive());
        dispatch(setProductoElementActive({element:producto}));
        setOpenModalDelete(!openModalDelete)
    }

    const getProductos = async () => {
        await productosService.getAll().then(()=> {
            dispatch(setProductoElementActive({element:producto}));
        })
    }

    const productoActivo=useAppSelector((state) => state.productosReducer.elementActive);

    // useEffect(() => {
    //     if(!openModalEdit || !openModalVer || !openModalDelete){
    //         getProductos();
    //     }
    //   }, [openModalEdit, openModalVer, openModalDelete]);
    
    return (
        <div className={styles.itemContainer}>
            <div className={styles.productoContainer}>
                <p>{`${producto?.denominacion}`}
                <span className={styles.tooltip}>{`${producto?.denominacion}`}</span>
                </p>
                <p>{`${producto?.precioVenta}`}</p>
                <p className={styles.descripcion}>
                    {`${producto?.descripcion}`}
                    <span className={styles.tooltip}>{`${producto?.descripcion}`}</span>
                </p>
                <p>{`${producto?.categoria?.denominacion}`}
                <span className={styles.tooltip}>{`${producto?.categoria?.denominacion}`}</span>
                </p>
                {producto?.habilitado ? (<span className="material-symbols-outlined" style={{ color: "green" }}>check_circle</span>)
                    :
                    (<span className="material-symbols-outlined" style={{ color: "red" }}>
                        cancel</span>)}
            </div>
            <div className={styles.accionesContainer}>
            <OverlayTrigger  placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-ver">Ver Producto</Tooltip>
            }>
          <Button variant="primary" onClick={handleVerProducto}>
            <span className="material-symbols-outlined" style={{ color: "#ffb600" }}>table_eye</span>
          </Button>
          </OverlayTrigger>
          <OverlayTrigger  placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip-ver">Editar Producto</Tooltip>
            }>
          <Button variant="primary" onClick={handleEditarProducto}>
            <span className="material-symbols-outlined" style={{ color: "#3e6d88" }}>edit</span>
          </Button>
          </OverlayTrigger>
          <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip-delete-empresa">
                      Eliminar Producto
                    </Tooltip>
                  }
                >
                  <Button variant="danger" onClick={handleDeleteProducto}>
                    <span className="material-symbols-outlined" style={{ color: "#933631" }}>delete</span>
                  </Button>
                </OverlayTrigger>
            </div>
            {openModalEdit && <EditarProducto getProductos={getProductos} openModal={openModalEdit} setOpenModal={setOpenModalEdit}/>}
            {openModalVer && <VerProducto producto={productoActivo!}/>}
            {openModalDelete && <DeleteProducto getProductos={getProductos} productoActivo={productoActivo!}/>}
        </div>
    );
} 

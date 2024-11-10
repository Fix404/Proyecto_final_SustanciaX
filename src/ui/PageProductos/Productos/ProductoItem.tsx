import { FC, useEffect, useState } from "react";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import styles from "./ProductoItem.module.css";
import { useAppDispatch } from "../../../hooks/redux";
import { ProductoService } from "../../../services/ParticularServices/ProductoService";
import { removeProductoElementActive, setProductoElementActive } from "../../../redux/slices/ProductosReducer";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

interface IProductosItem {
    producto: IProductos;
}

export const ProductoItem: FC<IProductosItem> = ({ producto }) => {
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalVer, setOpenModalVer] = useState(false);
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

    const getProductos = async () => {
        await productosService.getAll().then(()=> {
            dispatch(setProductoElementActive({element:producto}));
        })
    }

    useEffect(() => {
        if(!openModalEdit || !openModalVer){
            getProductos();
        }
      }, [openModalEdit, openModalVer]);
    
    return (
        <div className={styles.itemContainer}>
            <div className={styles.productoContainer}>
                <p>{`${producto?.denominacion}`}</p>
                <p>{`${producto?.precioVenta}`}</p>
                <p className={styles.descripcion}>
                    {`${producto?.descripcion}`}
                    <span className={styles.tooltip}>{`${producto?.descripcion}`}</span>
                </p>
                <p>{`${producto?.categoria?.denominacion}`}</p>
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
                  <Button variant="danger">
                    <span className="material-symbols-outlined" style={{ color: "#933631" }}>delete</span>
                  </Button>
                </OverlayTrigger>
            </div>
        </div>
    );
}
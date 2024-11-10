import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductos } from "../../types/dtos/productos/IProductos";

interface IInitialStateProducto {
    dataList: IProductos[],
    elementActive: null | IProductos
}

const initialState: IInitialStateProducto = {
    dataList: [],
    elementActive: null
}

interface PayLoadSetProductoElement {
    element: IProductos;
}

const ProductosReducer = createSlice({
    name: "ProductosReducer",
    initialState,
    reducers: {
        setDataProductoList(state, action: PayloadAction<any[]>) {
            state.dataList = action.payload;
        },
        setProductoElementActive(state, action: PayloadAction<PayLoadSetProductoElement>) {
            state.elementActive = action.payload.element;
        },
        removeProductoElementActive(state) {
            state.elementActive = null;
        }
    },
});

export const { setDataProductoList, setProductoElementActive, removeProductoElementActive } = ProductosReducer.actions;
export default ProductosReducer.reducer;
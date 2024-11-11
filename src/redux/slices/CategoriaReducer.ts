import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategorias } from "../../types/dtos/categorias/ICategorias";

interface IInitialStateCategoria {
    dataList: ICategorias[],
    elementActive: null | ICategorias
}

const initialState: IInitialStateCategoria = {
    dataList: [],
    elementActive: null
}

interface PayLoadSetCategoriaElement {
    element: ICategorias;
}

const CategoriaReducer = createSlice({
    name: "CategoriaReducer",
    initialState,
    reducers: {
        setDataCategoriaList(state, action: PayloadAction<any[]>) {
            state.dataList = action.payload;
        },
        setCategoriaElementActive(state, action: PayloadAction<PayLoadSetCategoriaElement>) {
            state.elementActive = action.payload.element;
        },
        removeCategoriaElementActive(state) {
            state.elementActive = null;
        }
    },
});

export const { setDataCategoriaList, setCategoriaElementActive, removeCategoriaElementActive } = CategoriaReducer.actions;
export default CategoriaReducer.reducer;
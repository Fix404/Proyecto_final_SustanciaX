import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";

interface IInitialStateEmpresa{
    empresaList: IEmpresa[],
    empresaActiva: null | IEmpresa
}

const initialState:IInitialStateEmpresa ={
    empresaList:[],
    empresaActiva: null
}

interface PayLoadSetEmpresaElement{
    element:IEmpresa;
}

const EmpresasReducer = createSlice({
    name:"EmpresasReducer",
    initialState,
    reducers: {
        setDataEmpresaList(state, action:PayloadAction<any[]>){
            state.empresaList=action.payload;
        },
        setEmpresaActiva(state, action:PayloadAction<PayLoadSetEmpresaElement>){
            state.empresaActiva=action.payload.element;
        },
        removeEmpresaActiva(state){
            state.empresaActiva=null;
        }
    },
});

export const {setDataEmpresaList, setEmpresaActiva, removeEmpresaActiva}=EmpresasReducer.actions
export default EmpresasReducer.reducer;
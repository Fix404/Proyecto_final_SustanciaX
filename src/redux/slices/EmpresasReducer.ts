import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";

interface IInitialStateEmpresa{
    dataList: IEmpresa[],
    elementActive: null | IEmpresa
}

const initialState:IInitialStateEmpresa ={
    dataList:[],
    elementActive: null
}

interface PayLoadSetEmpresaElement{
    element:IEmpresa;
}

const EmpresasReducer = createSlice({
    name:"EmpresasReducer",
    initialState,
    reducers: {
        setDataEmpresaList(state, action:PayloadAction<any[]>){
            state.dataList=action.payload;
        },
        setEmpresaElementActive(state, action:PayloadAction<PayLoadSetEmpresaElement>){
            state.elementActive=action.payload.element;
        },
        removeEmpresaElementActive(state){
            state.elementActive=null;
        }
    },
});

export const {setDataEmpresaList, setEmpresaElementActive, removeEmpresaElementActive}=EmpresasReducer.actions
export default EmpresasReducer.reducer;
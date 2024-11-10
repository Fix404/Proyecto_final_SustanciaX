import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";

interface IInitialStateAlergeno{
    alergenosList: IAlergenos[],
    alergenoActivo: null | IAlergenos
}

const initialState:IInitialStateAlergeno ={
    alergenosList:[],
    alergenoActivo: null
}

interface PayLoadSetEmpresaElement{
    element:IAlergenos;
}

const AlergenoReducer = createSlice({
    name:"AlergenoReducer",
    initialState,
    reducers: {
        setAlergenoList(state, action:PayloadAction<any[]>){
            state.alergenosList=action.payload;
        },
        setAlergenoActivo(state, action:PayloadAction<PayLoadSetEmpresaElement>){
            state.alergenoActivo=action.payload.element;
        },
        removeAlergenoActivo(state){
            state.alergenoActivo=null;
        }
    },
});

export const {setAlergenoList, setAlergenoActivo, removeAlergenoActivo}=AlergenoReducer.actions
export default AlergenoReducer.reducer;
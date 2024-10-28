import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { ICreateSucursal } from "../../types/dtos/sucursal/ICreateSucursal";


interface IInitialState {
    dataTable: ISucursal[]; 
    elementActive: null | ICreateSucursal; 
  }

  const initialState: IInitialState = {
    dataTable: [], // Inicialmente la tabla está vacía
    elementActive: null, // No hay ningún elemento activo seleccionado inicialmente
  };
  
  // Interfaz para la acción del payload personalizado
  interface PayloadSetElement {
    element: ICreateSucursal; // Elemento de tipo ISucursal
  }
  
  // Creamos un slice con Redux Toolkit para manejar la tabla
  const TableReducer = createSlice({
    name: "TableReducer", // Nombre del slice
    initialState, // Estado inicial del slice
    reducers: {
      // Reducer para establecer los datos de la tabla
      setDataTable(state, action: PayloadAction<any[]>) {
        state.dataTable = action.payload; // Actualizamos los datos de la tabla con los datos proporcionados
      },
      // Reducer para establecer el elemento activo
      setElementActive(state, action: PayloadAction<PayloadSetElement>) {
        state.elementActive = action.payload.element; // Establecemos el elemento activo con el elemento proporcionado en el payload
      },
      // Reducer para eliminar el elemento activo
      removeElementActive(state) {
        state.elementActive = null; // Eliminamos el elemento activo estableciéndolo como null
      },
    },
  });
  
  // Exportamos los actions generados por el slice
  export const { setDataTable, setElementActive, removeElementActive } =
    TableReducer.actions;
  
  // Exportamos el reducer generado por el slice
  export default TableReducer.reducer;
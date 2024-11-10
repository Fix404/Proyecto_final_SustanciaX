import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";

interface IInitialStateSucursal {
    dataList: ISucursal[]; 
    elementActive: ISucursal | null ; 
  }

  const initialState: IInitialStateSucursal = {
    dataList: [], // Inicialmente la lista está vacía
    elementActive: null, // No hay ningún elemento activo seleccionado inicialmente
  };
  
  // Interfaz para la acción del payload personalizado
  interface PayloadSetSucursalElement {
    element: ISucursal; // Elemento de tipo ISucursal
  }
  
  // Creamos un slice con Redux Toolkit para manejar la tabla
  const TableReducerSucursal = createSlice({
    name: "TableReducerSucursal", // Nombre del slice
    initialState, // Estado inicial del slice
    reducers: {
      // Reducer para establecer los datos de la tabla
      setDataSucursalList(state, action: PayloadAction<any[]>) {
        state.dataList = action.payload; // Actualizamos los datos de la lista con los datos proporcionados
      },
      // Reducer para establecer el elemento activo
      setElementActive(state, action: PayloadAction<PayloadSetSucursalElement>) {
        state.elementActive = action.payload.element; // Establecemos el elemento activo con el elemento proporcionado en el payload
      },
      // Reducer para eliminar el elemento activo
      removeElementActive(state) {
        state.elementActive = null; // Eliminamos el elemento activo estableciéndolo como null
      },
    },
  });
  
  // Exportamos los actions generados por el slice
  export const { setDataSucursalList, setElementActive, removeElementActive } =
    TableReducerSucursal.actions;
  
  // Exportamos el reducer generado por el slice
  export default TableReducerSucursal.reducer;
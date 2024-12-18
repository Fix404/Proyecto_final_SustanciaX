import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";

interface IInitialStateSucursal {
    sucursalList: ISucursal[]; 
    sucursalActiva: ISucursal | null ; 
  }

  const initialState: IInitialStateSucursal = {
    sucursalList: [], // Inicialmente la lista está vacía
    sucursalActiva: null, // No hay ningún elemento activo seleccionado inicialmente
  };
  
  // Interfaz para la acción del payload personalizado
  interface PayloadSetSucursalElement {
    element: ISucursal; // Elemento de tipo ISucursal
  }
  
  // Creamos un slice con Redux Toolkit para manejar la tabla
  const SucursalReducer = createSlice({
    name: "SucursalReducer", // Nombre del slice
    initialState, // Estado inicial del slice
    reducers: {
      // Reducer para establecer los datos de la tabla
      setDataSucursalList(state, action: PayloadAction<any[]>) {
        state.sucursalList = action.payload; // Actualizamos los datos de la lista con los datos proporcionados
      },
      // Reducer para establecer el elemento activo
      setSucursalActiva(state, action: PayloadAction<PayloadSetSucursalElement>) {
        state.sucursalActiva = action.payload.element; // Establecemos el elemento activo con el elemento proporcionado en el payload
      },
      // Reducer para eliminar el elemento activo
      removeSucursalActiva(state) {
        state.sucursalActiva = null; // Eliminamos el elemento activo estableciéndolo como null
      },
    },
  });
  
  // Exportamos los actions generados por el slice
  export const { setDataSucursalList, setSucursalActiva, removeSucursalActiva } =
    SucursalReducer.actions;
  
  // Exportamos el reducer generado por el slice
  export default SucursalReducer.reducer;
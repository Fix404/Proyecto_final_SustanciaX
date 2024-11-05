import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICreateEmpresaDto } from "../../types/dtos/empresa/ICreateEmpresaDto";


interface IInitialState {
    elementActive: null | ICreateEmpresaDto; 
  }

  const initialState: IInitialState = {
    elementActive: null, // No hay ningún elemento activo seleccionado inicialmente
  };
  
  // Interfaz para la acción del payload personalizado
  interface PayloadSetElement {
    element: ICreateEmpresaDto; // Elemento de tipo ISucursal
  }
  
  // Creamos un slice con Redux Toolkit para manejar la tabla
  const CrearEmpresaReducer = createSlice({
    name: "CrearEmpresaReducer", // Nombre del slice
    initialState, // Estado inicial del slice
    reducers: {
      // Reducer para establecer el elemento activo
      setElementActiveCrearEmpresa(state, action: PayloadAction<PayloadSetElement>) {
        state.elementActive = action.payload.element; // Establecemos el elemento activo con el elemento proporcionado en el payload
      },
      // Reducer para eliminar el elemento activo
      removeElementActiveCrearEmpresa(state) {
        state.elementActive = null; // Eliminamos el elemento activo estableciéndolo como null
      },
    },
  });
  
  // Exportamos los actions generados por el slice
  export const { setElementActiveCrearEmpresa, removeElementActiveCrearEmpresa } =
    CrearEmpresaReducer.actions;
  
  // Exportamos el reducer generado por el slice
  export default CrearEmpresaReducer.reducer;
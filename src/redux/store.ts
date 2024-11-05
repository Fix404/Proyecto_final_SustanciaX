import { configureStore } from "@reduxjs/toolkit";
import TableReducerSucursal from "./slices/TableReducerSucursal"
import EmpresasReducer from "./slices/EmpresasReducer"
import CrearEmpresaReducer from "./slices/CrearEmpresaReducer"

export const store = configureStore({
    reducer: {
      crearEmpresaReducer: CrearEmpresaReducer,
      tablaReducerSucursal: TableReducerSucursal,
      empresaReducer: EmpresasReducer // Agregamos el reducer del slice TablaReducer al estado global con la clave tablaReducer
    },
  });
  
  // Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
  export type RootState = ReturnType<typeof store.getState>;
  // Tipo inferido: { modalReducer: ModalState, tablaReducer: TablaState }
  export type AppDispatch = typeof store.dispatch;
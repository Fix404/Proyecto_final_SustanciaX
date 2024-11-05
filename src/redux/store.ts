import { configureStore } from "@reduxjs/toolkit";
import TableReducer from "./slices/TableReducer"
import TableReducerSucursal from "./slices/TableReducerSucursal"

export const store = configureStore({
    reducer: {
      tablaReducer: TableReducer,
      tablaReducerSucursal: TableReducerSucursal // Agregamos el reducer del slice TablaReducer al estado global con la clave tablaReducer
    },
  });
  
  // Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
  export type RootState = ReturnType<typeof store.getState>;
  // Tipo inferido: { modalReducer: ModalState, tablaReducer: TablaState }
  export type AppDispatch = typeof store.dispatch;
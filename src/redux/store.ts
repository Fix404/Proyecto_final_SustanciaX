import { configureStore } from "@reduxjs/toolkit";
import SucursalReducer from "./slices/SucursalReducer"
import EmpresasReducer from "./slices/EmpresasReducer"
<<<<<<< HEAD
import AlergenoReducer from "./slices/AlergenoReducer"

export const store = configureStore({
    reducer: {
      sucursalReducer: SucursalReducer,
      empresaReducer: EmpresasReducer, // Agregamos el reducer del slice TablaReducer al estado global con la clave tablaReducer
      alergenoReducer: AlergenoReducer
=======
import CrearEmpresaReducer from "./slices/CrearEmpresaReducer"
import ProductosReducer from "./slices/ProductosReducer";

export const store = configureStore({
    reducer: {
      crearEmpresaReducer: CrearEmpresaReducer,
      tablaReducerSucursal: TableReducerSucursal,
      empresaReducer: EmpresasReducer, // Agregamos el reducer del slice TablaReducer al estado global con la clave tablaReducer
      productosReducer: ProductosReducer
>>>>>>> e7498a1098776f8c4ba247420723dcb08274e03e
    },
  });
  
  // Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
  export type RootState = ReturnType<typeof store.getState>;
  // Tipo inferido: { modalReducer: ModalState, tablaReducer: TablaState }
  export type AppDispatch = typeof store.dispatch;
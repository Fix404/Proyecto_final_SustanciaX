import { configureStore } from "@reduxjs/toolkit";
import SucursalReducer from "./slices/SucursalReducer"
import EmpresasReducer from "./slices/EmpresasReducer"
import AlergenoReducer from "./slices/AlergenoReducer"
import ProductosReducer from "./slices/ProductosReducer"
import CategoriaReducer from "./slices/CategoriaReducer";

export const store = configureStore({
    reducer: {
      sucursalReducer: SucursalReducer,
      empresaReducer: EmpresasReducer, // Agregamos el reducer del slice TablaReducer al estado global con la clave tablaReducer
      alergenoReducer: AlergenoReducer,
      productosReducer: ProductosReducer,
      categoriaReducer: CategoriaReducer
    },
  });
  
  // Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
  export type RootState = ReturnType<typeof store.getState>;
  // Tipo inferido: { modalReducer: ModalState, tablaReducer: TablaState }
  export type AppDispatch = typeof store.dispatch;
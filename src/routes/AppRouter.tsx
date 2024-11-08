import { Route, Routes } from "react-router-dom"
import { Admin } from "../screens/Administracion/Admin";
import { Home } from "../screens/Home/Home";


export const AppRouter = () => {


  return (
    <Routes>
      
      <Route path="/" element={<Home/>} />
         {/* Ruta para abrir administracion */}
      <Route path="/admin/" element={<Admin/>}/>
      </Routes>
  )
}

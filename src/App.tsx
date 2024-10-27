import { SucursalView } from "./SucursalView/SucursalView"
import { ISucursal } from "./types/dtos/sucursal/ISucursal";

function App() {

  const unaSucursal: ISucursal = {
    id: 1,
    nombre: "Sucursal Centro",
    empresa: {
      id: 1,
      nombre: "Empresa Ejemplo",
      razonSocial: "",
      cuit: 0,
      logo: null,
      sucursales: [],
      pais: {
        nombre: "unPais",
        id: 987
      }
    },
    domicilio: {
      id: 123,
      calle: "unaCalle",
      numero: 321,
      cp: 5657,
      piso: 3, 
      eliminado: false,
      nroDpto: 113,
      localidad: {
        id: 143,
        nombre: "unaLocalidad",
        provincia: {
          nombre: "unaProvincia",
          pais: {
            nombre: "unPais",
            id: 456
          },
          id: 321
        }
      }
    },
    calle: "otraCalle",
    latitud: 19.4326,
    longitud: -99.1332,
    categorias: [], // Asumiendo que tienes un array de categorías
    esCasaMatriz: true,
    horarioApertura: "08:00",
    horarioCierre: "18:00",
    eliminado: false,
    logo: "https://example.com/logo.png" // URL del logo
};

  return (
    <>
      <SucursalView sucursal={unaSucursal} />
    </>
  )
}

export default App

import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from "./components/Header/Header"
import { Body } from "./components/Body/Body"
import { Sidebar } from './components/Sidebar/Sidebar';

function App() {
  const dummyFunction = () => {

  }

  return (
    <>
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="sidebar p-3"
          style={{
            width: "20%",
            backgroundColor: "#f4eae9",
            height: "100vh",
          }}
        >
          <Sidebar onAddEmpresaClick={dummyFunction} />
        </div>

        {/* Header y Body */}
        <div className="flex-grow-1 d-flex flex-column">
          <Header />
          <Body />
        </div>

      </div>
    </>
  )
}

export default App

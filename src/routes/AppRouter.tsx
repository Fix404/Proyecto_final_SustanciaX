import { Routes, Route } from 'react-router-dom';
import Admin from '../screens/Administracion/Admin';
import { Home } from '../screens/Home/Home';

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Página de inicio */}
                <Route path="admin" element={<Admin />} /> {/* Página de administración */}
                {/* Otras rutas pueden ser añadidas aquí */}
            </Routes>
        </>
    );
};

export default AppRouter;
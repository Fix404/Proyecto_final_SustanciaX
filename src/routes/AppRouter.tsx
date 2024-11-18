import { Routes, Route} from 'react-router-dom';
import Admin from '../screens/Administracion/Admin';
import { Home } from '../screens/Home/Home';
import { useAppSelector } from '../hooks/redux';

const AppRouter = () => {
    const empresaActiva=useAppSelector((state) => state.empresaReducer.empresaActiva);
    const sucursalActiva=useAppSelector((state) => state.sucursalReducer.sucursalActiva);
    return (
        <>
            <Routes>
                <Route path="*" element={
            empresaActiva && sucursalActiva ? (
                <Routes>
                    <Route path="admin" element={<Admin />} />
                </Routes>
            ):(
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            ) 
         } />
            </Routes>
        </>
    );
};

export default AppRouter;

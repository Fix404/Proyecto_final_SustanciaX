import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from '../screens/Administracion/Admin';
import { Home } from '../screens/Home/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Página de inicio */}
                <Route path="/admin" element={<Admin />} /> {/* Página de administración */}
                {/* Otras rutas pueden ser añadidas aquí */}
            </Routes>
        </Router>
    );
};

export default App;
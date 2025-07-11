import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { useAuthContext } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

import LandingPage from './pages/LandingPage';
import Checkout from './pages/Checkout';
import LoginBoost from './components/LoginBoost';
import ProductosContainer from './components/ProductosContainer';
import ProductoDetalle from './components/ProductoDetalle';
import CarritoContainer from './components/CarritoContainer';
import About from './components/About';
import Contacto from './components/Contacto';
import Admin from './components/Admin';
import FormularioProducto from './components/FormularioProducto';
import FormularioEdicion from './components/FormularioEdicion';

function App() {
  const { verificacionLog } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificar = async () => {
      await verificacionLog();  // ya no usamos .finally
      setLoading(false);
    };
    verificar();
  }, [verificacionLog]);

  if (loading) return <p>Cargando aplicación...</p>;

  return (
    <Router>
      <div className="grid-container">
        <Nav className="nav" />

        <main className="main">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginBoost />} />
              <Route path="/productos" element={<ProductosContainer />} />
              <Route path="/productos/:id" element={<ProductoDetalle />} />
              <Route path="/carrito" element={<CarritoContainer />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin/agregarProductos" element={<FormularioProducto />} />
              <Route path="/admin/editarProducto/:id" element={<FormularioEdicion />} />
            </Routes>
          </ErrorBoundary>
        </main>

        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;

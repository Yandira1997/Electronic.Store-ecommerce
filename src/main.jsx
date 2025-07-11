import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarritoProvider } from './contexts/CarritoContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ProductosProvider } from './contexts/ProductosContext.jsx'
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarToggle from 'react-bootstrap/NavbarToggle'
import { BusquedaProvider } from "./contexts/BusquedaContext";
import './App.css';
import 'sweetalert2/dist/sweetalert2.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BusquedaProvider>
      <ProductosProvider>
      <AuthProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
      </AuthProvider>
      </ProductosProvider>
      </BusquedaProvider>
    </HelmetProvider>
  </StrictMode>
);

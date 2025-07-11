import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { Navbar, Nav as NavBootstrap, Container, Form } from "react-bootstrap";
import { useBusqueda } from "../contexts/BusquedaContext";

function Nav() {
  const { productosCarrito } = useContext(CarritoContext);
  const { admin } = useAuthContext();
  const { filtro, setFiltro } = useBusqueda();
  const location = useLocation();

  const totalItems = productosCarrito.reduce(
    (total, prod) => total + (Number(prod.cantidad) || 0),
    0
  );

  const mostrarBarraBusqueda = location.pathname === "/productos";

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <Navbar expand="lg" className="shadow custom-navbar">

      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Electronic Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav" className="w-100">
          <NavBootstrap className="mx-auto">
            <NavBootstrap.Link as={Link} to="/" className={`nav-link-custom ${isActive('/')}`}>Inicio</NavBootstrap.Link>
            <NavBootstrap.Link as={Link} to="/productos" className={`nav-link-custom ${isActive('/productos')}`}>Productos</NavBootstrap.Link>
            <NavBootstrap.Link as={Link} to="/nosotros" className={`nav-link-custom ${isActive('/nosotros')}`}>About</NavBootstrap.Link>
            <NavBootstrap.Link as={Link} to="/contacto" className={`nav-link-custom ${isActive('/contacto')}`}>Contacto</NavBootstrap.Link>
            {admin && (
              <>
                <NavBootstrap.Link as={Link} to="/admin/agregarProductos" className={`nav-link-custom ${isActive('/admin/agregarProductos')}`}>Agregar Productos</NavBootstrap.Link>
              </>
            )}
          </NavBootstrap>

          <NavBootstrap className="ms-auto d-flex align-items-center">
            <NavBootstrap.Link as={Link} to="/login" aria-label="Iniciar sesión">
              <FaRegUserCircle size={25} className="text-white" />
            </NavBootstrap.Link>

            <NavBootstrap.Link as={Link} to="/carrito" aria-label={`Carrito con ${totalItems} artículos`} className="d-flex align-items-center ms-3">
              <BsCart2 size={25} className="text-white"/>
              <span className="ms-1">{totalItems || 0}</span>
            </NavBootstrap.Link>
          </NavBootstrap>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav;

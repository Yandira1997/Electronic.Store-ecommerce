import { useEffect, useState } from "react";
import "../styles/Productos.css";
import Card from "./Card";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { Helmet } from "react-helmet-async";
import { Col, Row } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";

function ProductosContainer() {
  const { verificacionLog } = useAuthContext();
  const { productos, obtenerProductos } = useProductosContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const paginaURL = parseInt(searchParams.get("page")) || 1;
  const filtroURL = searchParams.get("filtro") || "";

  const [paginaActual, setPaginaActual] = useState(paginaURL);
  const [filtro, setFiltro] = useState(filtroURL);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const productosPorPagina = 8;

  useEffect(() => {
    verificacionLog();
  }, []);

  useEffect(() => {
    obtenerProductos()
      .then(() => setCargando(false))
      .catch(() => {
        setError("Hubo un problema al cargar los productos.");
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    const p = parseInt(searchParams.get("page")) || 1;
    const f = searchParams.get("filtro") || "";
    setPaginaActual(p);
    setFiltro(f);
  }, [searchParams]);

  const manejarFiltro = (nuevoFiltro) => {
    setSearchParams({ page: 1, filtro: nuevoFiltro });
  };

  const cambiarPagina = (numeroPagina) => {
    setSearchParams({ page: numeroPagina, filtro });
  };

  const productosFiltrados = productos
  ? productos.filter((producto) =>
      (producto.nombre || producto.name || "")
        .toLowerCase()
        .includes(filtro.toLowerCase())
    )
  : [];


  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  if (cargando) return <p className="text-center">Cargando productos...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="productos-conteiner">
      <Helmet>
        <title>Productos</title>
        <meta name="description" content="Explora nuestra variedad de productos." />
      </Helmet>

      <SearchBar filtro={filtro} setFiltro={manejarFiltro} />

      <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
        {productosActuales.length > 0 ? (
          productosActuales.map((producto) => (
            <Col key={producto.id} className="d-flex justify-content-center">
              <Card producto={producto} paginaActual={paginaActual} filtro={filtro} />
            </Col>
          ))
        ) : (
          <p className="text-center">No se encontraron productos.</p>
        )}
      </Row>

      {totalPaginas > 1 && (
        <div className="contenedor-paginacion mt-4 d-flex justify-content-center">
          <Pagination className="m-0 paginacion-negra">
            <Pagination.First onClick={() => cambiarPagina(1)} disabled={paginaActual === 1} />
            <Pagination.Prev onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
              Anterior
            </Pagination.Prev>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <Pagination.Item
                key={num}
                active={paginaActual === num}
                onClick={() => cambiarPagina(num)}
              >
                {num}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
              Siguiente
            </Pagination.Next>
            <Pagination.Last onClick={() => cambiarPagina(totalPaginas)} disabled={paginaActual === totalPaginas} />
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default ProductosContainer;

import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import CantidadSelector from "../components/CantidadSelector";
import Swal from "sweetalert2";

function ProductoDetalle() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const pagina = searchParams.get("page") || 1;
  const filtro = searchParams.get("filtro") || "";

  const navegar = useNavigate();
  const { user, admin } = useAuthContext(); 
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } = useProductosContext();

  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => setCargando(false))
      .catch((error) => {
        if (error === "Producto no encontrado") setError("Producto no encontrado");
        else setError("Hubo un error al obtener el producto.");
        setCargando(false);
      });
  }, [id]);

  function funcionCarrito() {
    if (!user) {
      Swal.fire({
        title: "Acción no permitida",
        text: "Debes iniciar sesión para agregar productos al carrito",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      setTimeout(() => {
        navegar("/login");
      }, 1500);
      return;
    }

    if (cantidad < 1) return;

    agregarAlCarrito({
      id: productoEncontrado.id,
      name: productoEncontrado.name,
      price: Number(productoEncontrado.price),
      imagen: productoEncontrado.imagen,
      cantidad: Number(cantidad),
    });

    Swal.fire({
      title: "Producto agregado",
      text: "El producto fue agregado con éxito",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
  }

  function dispararEliminar() {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProducto(id)
          .then(() => {
            Swal.fire("Eliminado", "El producto fue eliminado correctamente.", "success");
            navegar(`/productos?page=${pagina}`);
          })
          .catch((error) => {
            Swal.fire("Error", error || "No se pudo eliminar el producto.", "error");
          });
      }
    });
  }

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <div style={{ minHeight: "calc(100vh - 200px)" }}>
      <h2 className="text-center mb-4 titulo-detalle">Detalle del producto</h2>

      <div className="producto-detalle-card container">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-6 text-center">
            <img
              className="producto-img"
              src={productoEncontrado.imagen}
              alt={productoEncontrado.name}
            />
          </div>

          <div className="col-12 col-md-6 producto-info d-flex flex-column align-items-center text-center">
            <h3 className="card-title">{productoEncontrado.name}</h3>
            <p className="mt-3">{productoEncontrado.description}</p>
            <h4 className="mt-3" style={{ color: "#000" }}>
              ${Number(productoEncontrado.price).toLocaleString()}
            </h4>

            {!admin && (
              <CantidadSelector cantidad={cantidad} setCantidad={setCantidad} />
            )}

            <div className="mt-4 d-flex flex-wrap justify-content-center gap-3">
              {admin ? (
                <>
                  <Link to={`/admin/editarProducto/${id}`}>
                    <button className="btn btn-outline-primary">Editar producto</button>
                  </Link>
                  <button className="btn btn-outline-danger" onClick={dispararEliminar}>
                    Eliminar Producto
                  </button>
                </>
              ) : (
                <button className="btn btn-dark" onClick={funcionCarrito}>
                  Agregar al carrito
                </button>
              )}
              <Link to={`/productos?page=${pagina}&filtro=${encodeURIComponent(filtro)}`}>
                <button className="btn btn-secondary">Volver a productos</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;







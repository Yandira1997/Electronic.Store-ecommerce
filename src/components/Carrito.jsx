import "../styles/Carrito.css";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import CarritoCard from "./CarritoCard.jsx";
import OrderSummary from "./ResumenCompra";

export default function Carrito() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const {
    productosCarrito,
    vaciarCarrito,
    borrarProductoCarrito,
    aumentarCantidad,
    disminuirCantidad,
  } = useContext(CarritoContext);

  if (!user) return <Navigate to="/login" replace />;

  const total = productosCarrito.reduce(
    (acc, producto) => acc + (producto.price || 0) * (producto.cantidad || 1),
    0
  );

  const manejarAccionCarrito = (productoId, accion) => {
    if (accion === "sumar") aumentarCantidad(productoId);
    else if (accion === "restar") disminuirCantidad(productoId);
    else if (accion === "eliminar") borrarProductoCarrito(productoId);
  };

  return (
    <div className="carrito-conteiner">
      <h2 className="subtitulo-carrito">Carrito de compras</h2>

      {productosCarrito.length > 0 ? (
        productosCarrito.map((producto) => (
          <CarritoCard
            key={producto.id}
            producto={producto}
            funcionDisparadora={manejarAccionCarrito}
          />
        ))
      ) : (
        <div className="carrito-vacio">
          <p>Tu carrito está vacío</p>
        </div>
      )}

      {total > 0 && (
        <>
          <div className="carrito-total mt-4">
            <OrderSummary
              subtotal={total}
              textColor="dark"
              onComprar={() => {
                console.log("🛒 Comprando...");
                navigate("/checkout");
              }}
            />
          </div>

          <div className="text-center mt-3">
            <button className="btn btn-danger" onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}


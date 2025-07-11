import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CarritoCard from "./CarritoCard";
import OrderSummary from "./ResumenCompra";
import { CarritoContext } from "../contexts/CarritoContext";

function CarritoContainer() {
  const {
    productosCarrito,
    borrarProductoCarrito,
    aumentarCantidad,
    disminuirCantidad,
  } = useContext(CarritoContext);

  const navigate = useNavigate();

  const subtotal = productosCarrito.reduce((acc, item) => {
    const cantidad = Number(item.cantidad) || 0;
    const precio = Number(item.price) || 0;
    return acc + cantidad * precio;
  }, 0);

  const handleComprar = () => {
    navigate("/checkout");
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8">
          <h4>Carrito de compras</h4>
          {productosCarrito.length > 0 ? (
            productosCarrito.map((producto) => (
              <CarritoCard
                key={producto.id}
                producto={producto}
                onSumar={aumentarCantidad}
                onRestar={disminuirCantidad}
                onEliminar={borrarProductoCarrito}
              />
            ))
          ) : (
            <p className="text-muted">El carrito está vacío.</p>
          )}
        </div>
        <div className="col-md-4">
          <h4>Resumen de Compra</h4>
          <OrderSummary
            subtotal={subtotal}
            textColor="dark"
            onComprar={handleComprar}
          />
        </div>
      </div>
    </div>
  );
}

export default CarritoContainer;




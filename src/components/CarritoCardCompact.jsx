import "../styles/Carrito.css";

export default function CarritoCardCompact({ producto }) {
  if (!producto) return null;

  const cantidad = Number(producto.cantidad) || 0;
  const precio = Number(producto.price) || 0;

  return (
    <div className="carrito-card">
      <h5 className="fw-bold text-dark mb-3 text-center">{producto.name}</h5>

      <div className="d-flex align-items-center flex-column flex-md-row text-center text-md-start mb-3">
        <img
          src={producto.imagen}
          alt={`Imagen de ${producto.name}`}
          className="carrito-image me-md-3 mb-3 mb-md-0"
        />

        <div className="w-100">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-dark">Cantidad:</span>
            <span>{cantidad}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-dark">Precio unitario:</span>
            <span>${precio.toFixed(2)}</span>
          </div>

          <div className="d-flex justify-content-between border-top pt-2 mt-2 fw-semibold">
            <span className="text-dark">Subtotal:</span>
            <span>${(cantidad * precio).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

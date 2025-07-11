import "../styles/Carrito.css";

function CarritoCard({ producto, onSumar, onRestar, onEliminar }) {
  if (!producto) return null;

  const cantidad = Number(producto.cantidad) || 0;
  const precio = Number(producto.price) || 0;

  return (
    <div className="carrito-card">
      <h5 className="fw-bold text-dark mb-3 text-center">{producto.name}</h5>

      <div className="carrito-card-content">
        <img
          src={producto.imagen}
          alt={`Imagen de ${producto.name}`}
          className="carrito-image"
        />

        <div className="w-100 d-flex flex-column justify-content-between h-100">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-dark me-2">Cantidad:</span>
              <div className="d-flex align-items-center gap-3">
                <button
                  className="boton-restar"
                  onClick={() => onRestar(producto.id)}
                  disabled={cantidad <= 1}
                >
                  −
                </button>
                <span>{cantidad}</span>
                <button
                  className="boton-sumar"
                  onClick={() => onSumar(producto.id)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <span className="text-dark">Precio:</span>
              <span>${precio.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between border-top pt-2 mt-2 fw-semibold">
              <span className="text-dark">Subtotal:</span>
              <span>${(cantidad * precio).toFixed(2)}</span>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button
              className="boton-carrito"
              onClick={() => onEliminar(producto.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarritoCard;







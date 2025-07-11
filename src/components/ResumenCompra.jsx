import "../styles/Carrito.css";

export default function OrderSummary({ subtotal, textColor, onComprar }) {
  const safeSubtotal = Number(subtotal) || 0;

  return (
    <div className="carrito-resumen-card">
      <ul className="list-unstyled">
        <li className="mt-2">
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span className="fw-bold">${safeSubtotal.toFixed(2)}</span>
          </div>
        </li>
        <li className="mt-4 border-top pt-3">
          <div className="d-flex justify-content-between">
            <h5>Total</h5>
            <h5>${safeSubtotal.toFixed(2)}</h5>
          </div>
        </li>
      </ul>

      <button
        className="btn-celeste w-100 mt-3"
        onClick={onComprar}
        disabled={safeSubtotal <= 0}
      >
        Iniciar Compra
      </button>
    </div>
  );
}




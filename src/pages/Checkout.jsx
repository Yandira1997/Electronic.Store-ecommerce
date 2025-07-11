import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CarritoContext } from "../contexts/CarritoContext";
import CarritoCardCompact from "../components/CarritoCardCompact";

export default function Checkout() {
  const navigate = useNavigate();
  const {
    productosCarrito,
    borrarProductoCarrito,
    vaciarCarrito,
    aumentarCantidad,
    disminuirCantidad,
  } = useContext(CarritoContext);

  const subtotal = productosCarrito.reduce(
    (acc, producto) => acc + producto.price * producto.cantidad,
    0
  );

  const handlePagar = async () => {
    const result = await Swal.fire({
      title: "¿Deseás confirmar tu compra?",
      text: "Se procesará tu pedido.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, pagar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      vaciarCarrito();
      await Swal.fire({
        title: "Compra exitosa",
        text: "Gracias por tu compra.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      navigate("/productos");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Resumen de Compra</h2>

      {productosCarrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          {productosCarrito.map((producto) => (
            <CarritoCardCompact
              key={producto.id}
              producto={producto}
            />
          ))}

          <div className="mt-4">
            <h3>Total: ${subtotal.toFixed(2)}</h3>
            <button
              className="btn btn-success mx-auto d-block mt-3"
              onClick={handlePagar}
              disabled={subtotal <= 0}
            >
              Pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
}





import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css'; 

function Contacto() {
  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Mensaje enviado correctamente 🎉", {
      position: "top-right",
      autoClose: 3000,
    });

    e.target.reset();
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <form className="contacto-card" onSubmit={handleSubmit}>
            <h3 className="mb-3 text-center">Formulario de Contacto</h3>

            <input
              type="text"
              name="nombre"
              className="form-control mb-3"
              placeholder="Nombre"
              required
            />

            <input
              type="email"
              name="email"
              className="form-control mb-3"
              placeholder="Correo Electrónico"
              required
            />

            <textarea
              name="mensaje"
              className="form-control mb-3"
              placeholder="Mensaje"
              rows="4"
              required
            ></textarea>

            <button type="submit" className="btn btn-primary w-100 mt-2">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contacto;


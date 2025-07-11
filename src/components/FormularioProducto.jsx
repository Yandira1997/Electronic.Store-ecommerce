import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { agregarProducto } from '../assets/requests';
import Swal from 'sweetalert2';
import '../styles/Login.css';

function FormularioProducto() {
  const { user, admin, loading } = useAuthContext();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) return 'El nombre es obligatorio.';
    if (!producto.price || producto.price <= 0) return 'El precio debe ser mayor a 0.';
    if (!producto.description.trim() || producto.description.length < 10)
      return 'La descripción debe tener al menos 10 caracteres.';
    if (!producto.imagen.trim()) return 'La URL de la imagen no debe estar vacía.';
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validacion = validarFormulario();
    if (validacion === true) {
      agregarProducto(producto)
        .then(() => {
          setProducto({ name: '', price: '', description: '', imagen: '' });
          Swal.fire("Éxito", "Producto agregado correctamente.", "success");
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
    } else {
      Swal.fire("Error", validacion, "error");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (!admin)
    return (
      <div className="text-center mt-5">
        <h2>🚫 Acceso Denegado</h2>
        <p>No tienes permisos para agregar productos.</p>
      </div>
    );

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h3 className="text-center mb-4">Agregar Producto</h3>

        <input type="text" name="name" placeholder="Nombre" value={producto.name} onChange={handleChange} className="form-control mb-3" required />
        <input type="text" name="imagen" placeholder="URL de Imagen" value={producto.imagen} onChange={handleChange} className="form-control mb-3" required />
        <input type="number" name="price" placeholder="Precio" value={producto.price} onChange={handleChange} className="form-control mb-3" min="0" required />
        <textarea name="description" placeholder="Descripción" value={producto.description} onChange={handleChange} className="form-control mb-3" rows="4" required />

        <button type="submit" className="btn btn-primary">Agregar Producto</button>
      </form>
    </div>
  );
}

export default FormularioProducto;

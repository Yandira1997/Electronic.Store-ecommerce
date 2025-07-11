import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProductosContext } from '../contexts/ProductosContext';
import { useAuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import '../styles/Login.css';

function FormularioEdicion() {
  const { admin } = useAuthContext();
  const { obtenerProducto, productoEncontrado, editarProducto, eliminarProducto } = useProductosContext();
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => setCargando(false))
      .catch((err) => {
        setError(err.message || 'Error al obtener el producto.');
        setCargando(false);
      });
  }, [id]);

  useEffect(() => {
    if (productoEncontrado && productoEncontrado.id === id) {
      setProducto(productoEncontrado);
    }
  }, [productoEncontrado, id]);

  if (!admin) return <Navigate to="/login" replace />;
  if (cargando || !producto || producto.id !== id) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) return 'El nombre es obligatorio.';
    if (!producto.price || Number(producto.price) <= 0) return 'El precio debe ser mayor a 0.';
    if (!producto.description.trim() || producto.description.length < 10)
      return 'La descripción debe tener al menos 10 caracteres.';
    if (!producto.imagen.trim()) return 'La URL de la imagen no debe estar vacía.';
    try {
      new URL(producto.imagen);
    } catch {
      return 'La URL de la imagen no es válida.';
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validacion = validarFormulario();
    if (validacion === true) {
      setEnviando(true);
      editarProducto({ ...producto, price: Number(producto.price) })
        .then(() => {
          Swal.fire("Éxito", "Producto actualizado correctamente.", "success");
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        })
        .finally(() => setEnviando(false));
    } else {
      Swal.fire("Error", validacion, "error");
    }
  };

  const handleEliminar = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProducto(id)
          .then(() => {
            Swal.fire("Eliminado", "El producto fue eliminado correctamente.", "success");
          })
          .catch((err) => {
            Swal.fire("Error", err.message || "Error al eliminar el producto.", "error");
          });
      }
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h3 className="text-center mb-4">Editar Producto</h3>

        <input type="text" name="name" placeholder="Nombre" value={producto.name || ''} onChange={handleChange} className="form-control mb-3" required />
        <input type="text" name="imagen" placeholder="URL de Imagen" value={producto.imagen || ''} onChange={handleChange} className="form-control mb-3" required />
        <input type="number" name="price" placeholder="Precio" value={producto.price || ''} onChange={handleChange} className="form-control mb-3 sin-flechas" min="0" required />
        <textarea name="description" placeholder="Descripción" value={producto.description || ''} onChange={handleChange} className="form-control mb-3" rows="4" required />

        <button type="submit" className="btn btn-primary mb-3" disabled={enviando}>
          {enviando ? 'Actualizando...' : 'Actualizar Producto'}
        </button>

        <button type="button" className="btn btn-danger" onClick={handleEliminar}>
          Eliminar Producto
        </button>
      </form>
    </div>
  );
}

export default FormularioEdicion;





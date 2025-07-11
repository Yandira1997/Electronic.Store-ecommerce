import React, { createContext, useState, useContext } from 'react';

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  function obtenerProductos() {
    return new Promise((res, rej) => {
      fetch('https://681cfd4cf74de1d219ae7847.mockapi.io/productos')
        .then((respuesta) => respuesta.json())
        .then((datos) => {
          // Filtra productos que tienen una propiedad name válida
          const productosValidos = datos.filter(
            (p) => typeof p.name === 'string' && p.name.trim().length > 0
          );
          setProductos(productosValidos);
          setProductosOriginales(productosValidos);
          res(productosValidos);
        })
        .catch((error) => rej(error));
    });
  }

  function obtenerProducto(id) {
    return new Promise((res, rej) => {
      fetch(`https://681cfd4cf74de1d219ae7847.mockapi.io/productos/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Producto no encontrado");
          return res.json();
        })
        .then((producto) => {
          setProductoEncontrado(producto);
          res(producto);
        })
        .catch((err) => rej(err));
    });
  }

  function agregarProducto(producto) {
    return fetch('https://681cfd4cf74de1d219ae7847.mockapi.io/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    }).then(res => {
      if (!res.ok) throw new Error('Error al agregar el producto.');
      return res.json();
    });
  }

  function editarProducto(producto) {
    return fetch(`https://681cfd4cf74de1d219ae7847.mockapi.io/productos/${producto.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    }).then(res => {
      if (!res.ok) throw new Error('Error al actualizar el producto.');
      return res.json();
    });
  }

  function eliminarProducto(id) {
    return fetch(`https://681cfd4cf74de1d219ae7847.mockapi.io/productos/${id}`, {
      method: 'DELETE',
    }).then(res => {
      if (!res.ok) throw new Error('Error al eliminar el producto.');
      return true;
    });
  }

  function filtrarProductos(filtro) {
    if (!filtro || filtro.trim().length === 0) {
      setProductos(productosOriginales);
      return;
    }

    const productosFiltrados = productosOriginales.filter((producto) =>
      producto?.name?.toLowerCase().includes(filtro.toLowerCase())
    );

    setProductos(productosFiltrados);
  }

  return (
    <ProductosContext.Provider
      value={{
        productos,
        productoEncontrado,
        obtenerProductos,
        obtenerProducto,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        filtrarProductos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductosContext = () => useContext(ProductosContext);

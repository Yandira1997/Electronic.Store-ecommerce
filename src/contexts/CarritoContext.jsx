import React, { createContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const { user } = useAuthContext(); 
  const [productosCarrito, setProductosCarrito] = useState([]);

  const key = user?.email ? `carrito_${user.email}` : null;

  useEffect(() => {
    if (!key) {
      setProductosCarrito([]);
      return;
    }

    try {
      const guardado = localStorage.getItem(key);
      if (!guardado) {
        setProductosCarrito([]);
        return;
      }

      const parsed = JSON.parse(guardado);
      if (
        Array.isArray(parsed) &&
        parsed.every(p =>
          typeof p === 'object' &&
          p !== null &&
          'id' in p &&
          'name' in p &&
          'price' in p &&
          typeof p.price === 'number'
        )
      ) {
        setProductosCarrito(parsed);
      } else {
        console.warn(`🛑 Carrito inválido para ${key}.`);
        localStorage.removeItem(key);
        setProductosCarrito([]);
      }
    } catch (e) {
      console.error(`❌ Error al cargar carrito (${key}):`, e);
      setProductosCarrito([]);
    }
  }, [key]);

  useEffect(() => {
    if (key) {
      localStorage.setItem(key, JSON.stringify(productosCarrito));
    }
  }, [productosCarrito, key]);

  const agregarAlCarrito = (producto) => {
    const cantidad = Number(producto.cantidad) || 1;
    const price = Number(producto.price) || 0;

    const productoFormateado = {
      cantidad,
      price,
      ...producto,
    };

    const existe = productosCarrito.find(p => p.id === producto.id);

    if (existe) {
      const carritoActualizado = productosCarrito.map(p =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + cantidad } : p
      );
      setProductosCarrito(carritoActualizado);
    } else {
      setProductosCarrito([...productosCarrito, productoFormateado]);
    }
  };

  const vaciarCarrito = () => {
    setProductosCarrito([]);
    if (key) localStorage.removeItem(key);
  };

  const borrarProductoCarrito = (id) => {
    const nuevoCarrito = productosCarrito.filter(p => p.id !== id);
    setProductosCarrito(nuevoCarrito);
  };

    const aumentarCantidad = (id) => {
    setProductosCarrito(prev =>
      prev.map(p =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };

  const disminuirCantidad = (id) => {
    setProductosCarrito(prev =>
      prev
        .map(p =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter(p => p.cantidad > 0) 
    );
  };


  return (
    <CarritoContext.Provider
      value={{
        productosCarrito,
        agregarAlCarrito,
        vaciarCarrito,
        borrarProductoCarrito,
        aumentarCantidad,
        disminuirCantidad,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

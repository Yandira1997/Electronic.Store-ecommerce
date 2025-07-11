import React from 'react';

function CantidadSelector({ cantidad, setCantidad }) {
  const sumar = () => setCantidad(prev => prev + 1);
  const restar = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
      <button className="btn btn-outline-dark" onClick={restar}>-</button>
      <span className="fs-5">{cantidad}</span>
      <button className="btn btn-outline-primary" onClick={sumar}>+</button>
    </div>
  );
}

export default CantidadSelector;


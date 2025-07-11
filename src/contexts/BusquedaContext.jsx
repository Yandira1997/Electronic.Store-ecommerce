import { createContext, useContext, useState } from "react";

export const BusquedaContext = createContext();

export function BusquedaProvider({ children }) {
  const [filtro, setFiltro] = useState("");

  return (
    <BusquedaContext.Provider value={{ filtro, setFiltro }}>
      {children}
    </BusquedaContext.Provider>
  );
}

export const useBusqueda = () => useContext(BusquedaContext);




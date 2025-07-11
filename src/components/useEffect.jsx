import { useEffect } from "react";

useEffect(() => {
    console.log("Primera ejecución");
    return () => {
        // Limpieza del efecto
    };
}, []);
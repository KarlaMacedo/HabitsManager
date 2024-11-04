import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps { //type estructura de objeto props
  children: React.ReactNode;//permite recibir cualquier contenido React
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => { //componente funcional acepta ese tipo de props
    const { user, loading } = useAuth(); //hook data user || null

  if (loading) {
    return <p>Cargando...</p>; // Indicador de carga al esperar estado user
  }

  if (!user) {// Si no está autenticado
    //redirige a inicio de sesión y replace historial solo por esa ruta
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza contenido de la ruta privada
  return <>{children}</>;
};

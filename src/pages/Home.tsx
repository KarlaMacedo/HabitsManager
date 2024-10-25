import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div>
      <h1>Bienvenido a la App de Gestión de Tareas</h1>
      <p>Por favor, <Link to="/login">inicia sesión</Link> para acceder a tu panel.</p>
    </div>
  );
};

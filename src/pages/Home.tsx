import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div>
      <h1 className="mb-16">
        <span className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Habits Manager
        </span>
      </h1>

      <h1 className="text-4xl underline decoration-4 underline-offset-8 mb-10">Bienvenido a la App de Gestión de Tareas</h1>
      
      <p className="text-xl">Por favor, <Link to="/login" className="text-indigo-600 font-bold no-underline hover:underline">Inicia sesión</Link> para acceder a tu panel.</p>
    </div>
  );
};

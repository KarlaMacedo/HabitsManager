import React from "react";
import { auth } from "../firebase";

export const Dashboard: React.FC = () => {
  const handleLogout = () => {
    auth.signOut(); // Cierra sesión y redirige a login
  };

  return (
    <div>
      <h2>Panel de Usuario</h2>
      <p>¡Has iniciado sesión correctamente!</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

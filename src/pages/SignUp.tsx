import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // al registrarse exitosamente dirige al dashboard
    } catch (err) {
      setError("Error al crear la cuenta. Intenta nuevamente.");
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Crear Cuenta</button>
      </form>
      {error && <p>{error}</p>} {/* si hay un error lo muestra */}
      <p>
        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
};

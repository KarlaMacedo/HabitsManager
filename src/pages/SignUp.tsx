import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
    <div className="max-w-2xl mx-auto w-full h-full">
      <h2 className="text-4xl font-bold mb-10">Registrarse</h2>
      <form onSubmit={handleSignUp} className="flex flex-col gap-10 items-center">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mr-4 w-80"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mr-4 w-80"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 transition-all w-60">Crear Cuenta</button>
      </form>
      {error && <p className="text-red-600 font-bold">{error}</p>} {/* si hay un error lo muestra */}
      <p>
        ¿Ya tienes una cuenta? <Link to="/login" className="text-indigo-600 font-bold no-underline hover:underline">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

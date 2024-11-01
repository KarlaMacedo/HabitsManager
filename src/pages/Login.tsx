import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");// Redirige a dashboard si autentica
    } catch (err) {
      setError("Error de inicio de sesión. Revisa tus credenciales.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full h-full">
      <h2 className="text-4xl font-bold mb-10">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-10 items-center">
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 transition-all w-60">Iniciar Sesión</button>
      </form>
      {error && <p className="text-red-600 font-bold">{error}</p>} {/* si hay un error lo muestra */}
      <p>
        ¿No tienes una cuenta? <Link to="/signup" className="text-indigo-600 font-bold no-underline hover:underline">Regístrate aquí</Link>
      </p>
    </div>
  );
};

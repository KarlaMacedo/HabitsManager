import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";  // Importamos la configuración de firebase

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {//Manejo del evento del form typescript
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuario registrado exitosamente");
    } catch (error) {
      const errorMessage = (error as Error).message; // Se tipea el error
      setError("Error al registrar: " + errorMessage);
    }
  };
  

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}//ref DOM
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p>{error}</p>} {/* error condicional */}
    </div>
  );
};

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Añadimos un estado de carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {//Escucha cambio de autenticacion del usuario
      setUser(currentUser);
      setLoading(false);
    });

    console.log(unsubscribe)

    return () => unsubscribe(); //detenemos la escucha ejecutando la referencia
  }, []);

  return { user, loading };
};

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

export const useAuth = () => {//Custom hook
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Bandera para esperar respuesta de onAuthStateChanged

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {//Escucha cambio de autenticacion del usuario
      setUser(currentUser);//setea respuesta
      setLoading(false);//se limpia cuando se sabe la respuesta
    });

    return () => unsubscribe(); //detenemos la escucha ejecutando la referencia
  }, []);

  return { user, loading }; //devuelve estado user auth y bandera de carga
};

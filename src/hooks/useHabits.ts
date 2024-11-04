import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, doc, arrayUnion, query, where } from "firebase/firestore";
import { auth } from "../firebase";

export interface Habit {
  id: string;
  name: string;
  completionLog: string[]; //Arry de fechas de completado
  userId: string; // Agregamos el userId para identificar el propietario
}

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = async () => {//escucha cambios en la data
    if (!auth.currentUser) return; // Asegurarse de que el usuario esté autenticado

    setLoading(true);//bandera cargando
    const habitsCollection = collection(db, "habits");
    const userHabitsQuery = query(habitsCollection, where("userId", "==", auth.currentUser.uid)); // Trae solo los hábitos del usuario
    const habitsSnapshot = await getDocs(userHabitsQuery);//obtiene data
    
    const habitsData = habitsSnapshot.docs.map((doc) => ({//setea el id y toda la data como el objeto de su interfaz
      id: doc.id,
      ...doc.data(),
    })) as Habit[];

    setHabits(habitsData);//setea data a estado
    setLoading(false);//down bandera
  };

  const toggleHabitCompletion = async (id: string) => {//recibe id
    try {
      const today = new Date().toISOString().split('T')[0]; // Solo la fecha en formato YYYY-MM-DD;
      const habitRef = doc(db, "habits", id);

      await updateDoc(habitRef, {
        completionLog: arrayUnion(today),//agrega fecha actual al array de la data
      });

      setHabits((prevHabits) => //actualiza la lista de habitos del estado
        prevHabits.map((habit) =>
          habit.id === id
            ? { ...habit, completionLog: [...habit.completionLog, today] }
            : habit
        )
      );
    } catch (error) {
      console.error("Error al actualizar el hábito:", error);
    }
  };

  const addHabit = async (name: string) => {
    try {
      const userId = auth.currentUser ? auth.currentUser.uid : ""; // Obtener el userId del usuario autenticado
      const newHabit = { name, completionLog: [], userId };
      const habitRef = await addDoc(collection(db, "habits"), newHabit);//agrega a la data el habito
      
      setHabits((prevHabits) => [
        ...prevHabits,
        { id: habitRef.id, ...newHabit },
      ]);//actualiza lista de habitos del estado
    } catch (error) {
      console.error("Error al agregar el hábito:", error);
    }
  };

  const getLastDaysCompletion = (days: number ,completionLog: string[]): boolean[] => {//recibe el array de fechas y devuelve array de boolean
    const today = new Date();
    return Array.from({ length: days }).map((_, i) => { //array de n elementos, sin valor actual _ y con el indice del elemento i
      const day = new Date(today); //copia de hoy para no modificar fecha original
      day.setDate(today.getDate() - i);// obtiene las fechas de los días anteriores
      const dayString = day.toISOString().split("T")[0]; //convierte a string "YYYY-MM-DD"
      return completionLog.includes(dayString); //verifica si esta presente en el array de fechas
    }).reverse();// se invierte para devolver del día más reciente al actual
  };
  

  useEffect(() => {
    fetchHabits();//detenemos la escucha ejecutando la referencia
  }, []);

  return { habits, loading, toggleHabitCompletion, addHabit, getLastDaysCompletion }; //retorna lista de habit, flag carga data, funcion marcar coplete y add habit
};

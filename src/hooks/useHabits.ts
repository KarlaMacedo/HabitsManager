import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";

export interface Habit {
  id: string;
  name: string;
  completionLog: string[]; //Arry de fechas de completado
}

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = async () => {//escucha cambios en la data
    setLoading(true);//bandera cargando
    const habitsCollection = collection(db, "habits");
    const habitsSnapshot = await getDocs(habitsCollection);//obtiene data
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
      const newHabit = { name, completionLog: [] };
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

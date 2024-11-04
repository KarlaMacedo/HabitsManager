import React, { useState }  from "react";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth"; // Hook obtener usuario
import { useHabits } from "../hooks/useHabits"; // Hook interactuar con Firestore


export const Dashboard: React.FC = () => {
  const user = useAuth(); // usuario autenticado
  const { habits, loading, toggleHabitCompletion, addHabit } = useHabits();//custom hook
  const [habitName, setHabitName] = useState("");

  const handleLogout = () => {// Cierra sesión y redirige a login cambiando estado auth
    auth.signOut(); 
  };

  const handleAddHabit = (e: React.FormEvent) => {//maneja funcionalidad del form agregar habito
    e.preventDefault();
    if (habitName.trim()) {
      addHabit(habitName.trim());
      setHabitName(""); // Limpia el campo después de agregar el hábito
    }
  };
  
  if (loading) return <p>Cargando hábitos...</p>;

  const isCompletedToday = (completionLog: string[]): boolean => {//verifica si el hábito está completado hoy revisando el array de fechas
    const today = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy como cadena
    return completionLog.includes(today); // Comprobar si hoy está en el log de completados
  };  

  return (
    <div>
      <h2>Seguimiento de Hábitos</h2>
      <p>Bienvenido, {user?.user?.email}</p>

      {/* Formulario para agregar un nuevo hábito */}
      <form onSubmit={handleAddHabit}>
        <input
          type="text"
          placeholder="Nuevo Hábito"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
        <button type="submit">Agregar Hábito</button>
      </form>

      <ul>
        {habits.map((habit) => (//por cada habito
          <li key={habit.id}>
            <h3>{habit.name}</h3>
            {isCompletedToday(habit.completionLog) ? (
              <label>Hábito completado hoy</label>
            ) : (
              <button onClick={() => toggleHabitCompletion(habit.id)}>
                Marcar como Completado
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Gráfico semanal (simulado) */}
      <div>
        <h3>Frecuencia semanal</h3>
        <p>Gráfico de completado semanal</p>
      </div>

      {/* Boton cerrar sesion */}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

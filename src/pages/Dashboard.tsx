import React, { useState }  from "react";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth"; // Hook obtener usuario
import { useHabits } from "../hooks/useHabits"; // Hook interactuar con Firestore
import "./Dashboard.css"


export const Dashboard: React.FC = () => {
  const user = useAuth(); // usuario autenticado
  const { habits, loading, toggleHabitCompletion, addHabit, getLastDaysCompletion } = useHabits();//custom hook
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

  const isCompletedToday = (completionLog: string[]): boolean => {//verifica si el hábito está completado hoy revisando el array de fechas
    const today = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy como cadena
    return completionLog.includes(today); // Comprobar si hoy está en el log de completados
  };  

  const getDayLabel = (daysAgo: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const dayLabels = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]; // Iniciales de días en español
    return dayLabels[date.getDay()];
  };

  if (loading) return <p className="text-center">Cargando hábitos...</p>;

  return (
    <div className="max-w-6xl mx-auto w-full h-full">
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 ms-auto text-white px-4 py-2 col-span-3 rounded hover:bg-red-600 transition-colors w-50"
        >
          Cerrar Sesión
        </button>
        
        <div className="col-span-3">
          <h2 className="text-2xl font-bold mb-4">Seguimiento de Hábitos</h2>
          <p className="mb-6 text-gray-700">Bienvenido, {user?.user?.email}</p>
        </div>      
        
      </div>

      {/* Formulario para agregar un nuevo hábito */}
      <form onSubmit={handleAddHabit} className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Nuevo Hábito"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mr-4 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 transition-all w-60"
        >
          Agregar Hábito
        </button>
      </form>

      {/* Lista de Hábitos en un grid responsive */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => {
          const lastDaysCompletion = getLastDaysCompletion(7, habit.completionLog);
          return (
            <li
              key={habit.id}
              className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{habit.name}</h3>
              {isCompletedToday(habit.completionLog) ? (
                <span className="text-green-600">Hábito completado hoy</span>
              ) : (
                <button
                  onClick={() => toggleHabitCompletion(habit.id)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Marcar como Completado
                </button>
              )}
              
              {/* Gráfico semanal */}
              <div className="mt-4">
                <h4 className="font-medium">Últimos 7 días</h4>
                <div className="flex space-x-3 mt-2 justify-center">
                {lastDaysCompletion.map((completed, index) => {
                    const isToday = index === 6;
                    const label = isToday ? "Hoy" : getDayLabel(6 - index);
                    const textColor = isToday ? "text-blue-600" : "text-gray-600";
                    const borderColor = isToday ? "border-blue-600" : "border-gray-300";
                    
                    return (
                      <div key={index} className="text-center">
                        <span className={`text-xs font-medium ${textColor}`}>
                          {label}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full ${borderColor} ${completed ? "bg-green-500" : "bg-gray-300"} border`}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

    </div>
  );
};

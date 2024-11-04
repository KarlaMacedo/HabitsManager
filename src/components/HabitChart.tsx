// HabitChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ChartDataLabels);

interface HabitChartProps {//estructura del componente
  completionLog: string[]; // Array de fechas completadas en formato "YYYY-MM-DD"
  timeFrame: "monthly" | "yearly";
}

export const HabitChart: React.FC<HabitChartProps> = ({ completionLog, timeFrame }) => {
  const today = new Date();
  const monthDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // Dias del mes actual
  const labels = timeFrame === "monthly" 
    ? Array.from({ length: monthDays }, (_, i) => i + 1) //array de dias dependiendo de su cantidad de dias
    : Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("default", { month: "short" }));//array de meses

  const completionCount = labels.map((_, index) => { //cuenta cuántas veces aparece para obtener las cantidades por cada etiqueta
    return completionLog.filter(date => {
      const logDate = new Date(date);
      if (timeFrame === "monthly") { //Filtra por año, mes y día
        return logDate.getFullYear() === today.getFullYear() && logDate.getMonth() === today.getMonth() && logDate.getDate() === index + 1;
      } else { //Filtra por año y mes
        return logDate.getFullYear() === today.getFullYear() && logDate.getMonth() === index;
      }
    }).length;
  });

  const data = {//configuración de datos y estilo del grafico
    labels: (labels as string[]),
    datasets: [
      {
        label: `Progreso ${timeFrame === "monthly" ? "Mensual" : "Anual"}`,
        data: completionCount,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
        y: {
            ticks: {
                display: false, // Oculta las etiquetas 
            },
            grid: {
                display: false, // Oculta las líneas de la cuadrícula 
            },
        },
        x: {
          grid: {
              display: false, // Oculta las líneas de la cuadrícula 
          },
        }
    },
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: `Progreso de Hábito - ${timeFrame === "monthly" ? "Este Mes" : "Este Año"}` },
      datalabels: {
          anchor: 'end' as const,
          align: 'end' as const,
          formatter: (value: number) => value !== 0 && timeFrame != "monthly" ? value.toString() : '', // Solo muestra el valor si no es 0
          color: 'black', // Color de las etiquetas
      },
    },
  };

  return <Bar data={data} options={options} />;//render grafica
};

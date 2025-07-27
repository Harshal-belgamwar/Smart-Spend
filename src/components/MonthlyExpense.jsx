import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyExpense = ({ graphData }) => {
  const data = useMemo(
    () => ({
      labels: graphData.labels,
      datasets: [
        {
          label: "Monthly Expenses",
          data: graphData.values,
          borderColor: "rgba(255, 0, 0, 1)",
          backgroundColor: "rgba(255, 0, 0, 0.12)",
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 3,
        },
        {
          label: "Monthly Income",
          data: graphData.income,
          borderColor: "rgba(0, 128, 0, 1)",
          backgroundColor: "rgba(0, 128, 0, 0.12)",
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 3,
        },
      ],
    }),
    [graphData]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: "Expense Overview (Monthly)",
          font: { size: 18 },
        },
      },
      scales: {
        x: {
          title: { display: true, text: "Month" },
          ticks: { color: "#444" },
          grid: { color: "#e0e7ef" }
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: "Amount (₹)" },
          ticks: { color: "#444" },
          grid: { color: "#e0e7ef" }
        },
      },
    }),
    []
  );

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlyExpense;
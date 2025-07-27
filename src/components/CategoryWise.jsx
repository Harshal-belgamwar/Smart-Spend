import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "rgba(255, 99, 132, 0.7)",
  "rgba(54, 162, 235, 0.7)",
  "rgba(255, 206, 86, 0.7)",
  "rgba(75, 192, 192, 0.7)",
  "rgba(153, 102, 255, 0.7)",
  "rgba(255, 159, 64, 0.7)",
  "#10B981", "#6366F1", "#F59E42", "#EAB308"
];

const CategoryWise = ({ labels, values }) => {
  const total = useMemo(() => values.reduce((a, b) => a + b, 0), [values]);

  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: "Category-wise Expense",
        data: values,
        backgroundColor: COLORS,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  }), [labels, values]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 20 }, // prevents clipping
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
            return `${context.label}: ₹${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        position: "bottom",
        labels: { boxWidth: 20, padding: 16 }
      },
      title: {
        display: true,
        text: "Category-wise Expense Distribution",
        font: { size: 16 }
      },
    },
  }), [total]);

  return (
    <div className="w-full h-full">
      <Pie data={data} options={options} />
    </div>
  );
};

export default CategoryWise;
// ...other imports remain the same
import CategoryWise from "./CategoryWise";
import { useSelector } from "react-redux";
import MonthlyExpense from "./MonthlyExpense";

const Dashboard = () => {
  const data = useSelector((state) => state.Transaction.expense);

  const graphData = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    values: Array(12).fill(0),
    income: Array(12).fill(0),
  };

  data.forEach((obj) => {
    const monthstr = obj.date.split("-")[1];
    const monthIndex = parseInt(monthstr, 10) - 1;
    if (
      monthIndex >= 0 &&
      monthIndex < 12 &&
      obj.type.toLowerCase() === "expense"
    ) {
      graphData.values[monthIndex] += parseFloat(obj.amount);
    }
  });

  data.forEach((obj) => {
    const monthstr = obj.date.split("-")[1];
    const monthIndex = parseInt(monthstr, 10) - 1;
    if (
      monthIndex >= 0 &&
      monthIndex < 12 &&
      obj.type.toLowerCase() === "income"
    ) {
      graphData.income[monthIndex] += parseFloat(obj.amount);
    }
  });

  // Pie chart data
  const categoryTotals = {};
  data.forEach((item) => {
    if (item.type.toLowerCase() === "expense") {
      const category = item.category;
      const amount = parseFloat(item.amount);
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    }
  });

  const pieChartLabels = Object.keys(categoryTotals);
  const pieChartValues = Object.values(categoryTotals);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-700 to-indigo-900 p-2 sm:p-4 md:p-8 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-2 sm:p-6 md:p-12">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-4 md:mb-12 bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent drop-shadow-md">
          Dashboard
        </h1>
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          {/* Monthly Expense Chart */}
          <div className="flex-1 min-w-[220px] max-w-full bg-gradient-to-br from-white to-slate-100 rounded-2xl shadow-lg border border-white/30 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center p-2 sm:p-4 md:p-8"
            style={{ minHeight: '400px', height: '100%', maxHeight: '650px' }} // Increased minHeight and maxHeight
          >
            <div className="w-full h-[350px] sm:h-[420px] md:h-[600px]"> {/* Increased internal height */}
              <MonthlyExpense graphData={graphData} />
            </div>
          </div>
          {/* Category Wise Pie Chart */}
          <div className="flex-1 min-w-[220px] max-w-full bg-gradient-to-br from-white to-slate-100 rounded-2xl shadow-lg border border-white/30 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center p-2 sm:p-4 md:p-8 aspect-square">
            <div className="w-full h-full flex items-center justify-center">
              <CategoryWise labels={pieChartLabels} values={pieChartValues} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
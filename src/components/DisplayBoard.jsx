import React from "react";
import { useSelector } from "react-redux";

const DisplayBoard = () => {
  const transactions = useSelector((state) => state.Transaction.expense);

 const currentDate = new Date();
const currentMonth = currentDate.getMonth(); // 0 = Jan, 6 = July
const currentYear = currentDate.getFullYear();

const thisMonthTransactions = transactions.filter((t) => {
  const date = new Date(t.date);
  return (
    date.getMonth() === currentMonth &&
    date.getFullYear() === currentYear
  );
});

  const totalIncome = thisMonthTransactions
  .filter((item) => item.type.toLowerCase() === "income")
  .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

const totalExpense = thisMonthTransactions
  .filter((item) => item.type.toLowerCase() === "expense")
  .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

const netBalance = totalIncome - totalExpense;


  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-xl border border-slate-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Financial Overview</h2>
        <p className="text-slate-600">Track your income and expenses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Income Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-emerald-100 text-sm font-medium">Total Income</p>
              <p className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</p>
            </div>
          </div>
          <div className="h-1 bg-white/20 rounded-full">
            <div className="h-full bg-white/40 rounded-full w-full"></div>
          </div>
        </div>

        {/* Total Expense Card */}
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-rose-100 text-sm font-medium">Total Expense</p>
              <p className="text-2xl font-bold">₹{totalExpense.toLocaleString()}</p>
            </div>
          </div>
          <div className="h-1 bg-white/20 rounded-full">
            <div className="h-full bg-white/40 rounded-full w-full"></div>
          </div>
        </div>

        {/* Net Balance Card */}
        <div className={`rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
          netBalance >= 0 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
            : 'bg-gradient-to-br from-orange-500 to-orange-600'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm font-medium">Net Balance</p>
              <p className="text-2xl font-bold">₹{netBalance.toLocaleString()}</p>
            </div>
          </div>
          <div className="h-1 bg-white/20 rounded-full">
            <div className="h-full bg-white/40 rounded-full w-full"></div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
          <p className="text-slate-600 text-sm">Expense Ratio</p>
          <p className="text-xl font-semibold text-slate-800">
            {totalIncome > 0 ? `${((totalExpense / totalIncome) * 100).toFixed(1)}%` : '0%'}
          </p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
          <p className="text-slate-600 text-sm">Savings Rate</p>
          <p className="text-xl font-semibold text-slate-800">
            {totalIncome > 0 ? `${(((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)}%` : '0%'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayBoard;
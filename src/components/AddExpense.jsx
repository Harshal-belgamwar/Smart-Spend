import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddTransaction } from "../store/Slices/Transaction";

const AddExpense = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "",
    date: "",
  });

 

  const handler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    //sent to redux toolkit
    e.preventDefault();

    const transactionData = {
      id: Date.now(),
      ...form,
      amount: parseFloat(form.amount),
    };

    dispatch(AddTransaction(transactionData));

    setForm({
      // Reset form
      title: "",
      amount: "",
      category: "",
      type: "",
      date: "",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Enhanced Background Container */}
      <div className="relative bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 rounded-2xl shadow-2xl">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
        <div className="absolute top-1/2 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-sm"></div>
        <div className="absolute top-1/4 left-4 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-sm"></div>

        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-8 w-4 h-4 border-2 border-white rotate-45"></div>
          <div className="absolute top-16 right-12 w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="absolute bottom-20 left-12 w-2 h-8 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-32 right-8 w-6 h-2 bg-white/20 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Header with Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                <span className="text-3xl">💳</span>
              </div>
              <h1 className="text-2xl font-bold text-white">
                Add New Transaction
              </h1>
              <p className="text-white/70 text-sm mt-2">
                Track your income and expenses
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-white/90"
              >
                💡 Transaction Description
              </label>
              <div className="relative">
                <input
                  id="description"
                  type="text"
                  name="title"
                  pattern="^[A-Za-z\s]*$"
                  value={form.title}
                  placeholder="Enter transaction description"
                  className="w-full px-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
                  onChange={handler}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-white/90"
              >
                💰 Amount (₹)
              </label>
              <div className="relative">
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  value={form.amount}
                  step="0.01"
                  min={0}
                  placeholder="0.00"
                  onChange={handler}
                  className="w-full px-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-white/70 text-sm">INR</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-white/90"
              >
                📂 Category
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                required
                onChange={handler}
                className="w-full px-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
              >
                <option value="" disabled className="text-gray-400 bg-gray-800">
                  Select Category
                </option>
                <option value="food" className="text-gray-900 bg-white">
                  🍽️ Food & Dining
                </option>
                <option value="travel" className="text-gray-900 bg-white">
                  🚗 Traveling
                </option>
                <option value="shopping" className="text-gray-900 bg-white">
                  🛍️ Shopping
                </option>
                <option
                  value="entertainment"
                  className="text-gray-900 bg-white"
                >
                  🎬 Entertainment
                </option>
                <option value="bills" className="text-gray-900 bg-white">
                  📄 Bills & Utilities
                </option>
                <option value="healthcare" className="text-gray-900 bg-white">
                  🏥 Healthcare
                </option>
                <option value="education" className="text-gray-900 bg-white">
                  📚 Education
                </option>
                <option value="salary" className="text-gray-900 bg-white">
                  💼 Salary
                </option>
                <option value="freelance" className="text-gray-900 bg-white">
                  💻 Freelance Income
                </option>
                <option value="investment" className="text-gray-900 bg-white">
                  📈 Investment
                </option>
                <option value="other" className="text-gray-900 bg-white">
                  📋 Other
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-white/90"
              >
                🔄 Transaction Type
              </label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handler}
                className="w-full px-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
              >
                <option
                  value=""
                  disabled
                  hidden
                  className="text-gray-400 bg-gray-800"
                >
                  Select Type
                </option>
                <option value="income" className="text-gray-900 bg-white">
                  ⬆️ Income
                </option>
                <option value="expense" className="text-gray-900 bg-white">
                  ⬇️ Expense
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-white/90"
              >
                📅 Date
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={form.date}
                onChange={handler}
                className="w-full px-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Enhanced Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full relative px-6 py-4 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:from-white/30 hover:to-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>✨</span>
                  <span>Add Transaction</span>
                  <span>✨</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-sm"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;

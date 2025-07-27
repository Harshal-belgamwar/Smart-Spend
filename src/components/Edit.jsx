import React, { useState, useEffect } from "react";

const Edit = ({ isOpen, onClose, transactionToEdit, onSave }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (transactionToEdit) {
      setTitle(transactionToEdit.title || "");
      setAmount(transactionToEdit.amount || "");
      setType(transactionToEdit.type || "expense");
      setCategory(transactionToEdit.category || "");
      setDate(transactionToEdit.date || "");
    }
  }, [transactionToEdit]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) return;

    const updatedTransaction = {
      id: transactionToEdit.id,
      title,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    onSave(updatedTransaction); // Send data to parent component
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="scrollbar-gutter-stable fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md border-2 border-indigo-200">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Edit Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-semibold text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="income">Income</option>
              <option value="Transfer" className="text-gray-900 bg-white">
                   Transfer
                </option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Categories</option>
              <option value="food">🍽️ Food & Dining</option>
              <option value="transport">🚗 Transportation</option>
              <option value="shopping">🛍️ Shopping</option>
              <option value="entertainment">🎬 Entertainment</option>
              <option value="bills">💡 Bills & Utilities</option>
              <option value="healthcare">🏥 Healthcare</option>
              <option value="education">📚 Education</option>
              <option value="salary">💰 Salary</option>
              <option value="freelance">💼 Freelance Income</option>
              <option value="investment">📈 Investment</option>
              <option value="other">🔧 Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteTransaction,
  editTransaction,
} from "../store/Slices/Transaction";
import { DeleteAllTransaction } from "../store/Slices/Transaction";

// Import jsPDF and autoTable

import "jspdf-autotable";
import Pdf from "./Pdf";
import Edit from "./Edit";




const ListExpense = () => {
  const [selectedTransaction, setselectedTransaction] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const dispatch = useDispatch();

  

  const data = useSelector((state) => state.Transaction.expense);

  const handleDelete = (obj) => {
    dispatch(DeleteTransaction(obj));
  };

  const handleDetail = (obj) => {
    setselectedTransaction(obj);
  };

  const handleDeleteAll = () => {
    dispatch(DeleteAllTransaction());
  };

  const handleEdit = (obj) => {
    setTransactionToEdit(obj); // store selected transaction
    setIsOpen(true); // open modal
  };

  const handleSave = (updatedTransaction) => {
    dispatch(
      editTransaction({
        id: updatedTransaction.id,
        updatedData: updatedTransaction,
      })
    ); // your redux action
    setIsOpen(false);
  };
  // Filter data based on selected month and category
  const filteredData = data.filter((transaction) => {
    const month = transaction.date.split("-")[1]; // gets "07"
    const monthMatch = !selectedMonth || selectedMonth === month;
    const categoryMatch =
      !selectedCategory ||
      selectedCategory === transaction.category.toLowerCase();

    return monthMatch && categoryMatch;
  });

  const clearFilters = () => {
    setSelectedMonth("");
    setSelectedCategory("");
  };

  return (
    <div className="shadow-2xl rounded-2xl w-full max-w-full lg:max-w-4xl xl:max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 gap-6 lg:gap-8 mt-5 bg-gradient-to-br from-white via-blue-50 to-indigo-100 border border-blue-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3 sm:gap-4 border-b-2 border-indigo-200 pb-4 sm:pb-6 mb-4">
        <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H3.75zM3.75 6H2.25m1.5 0h16.5m0 0v.75c0 .414.336.75.75.75h.75m-1.5-1.5H21a.75.75 0 00-.75-.75v.75zm0 0H3.75m0 0v-.375C1.5 5.504 1.996 5 2.625 5H3.75z"
            />
          </svg>
        </div>
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Transaction History
        </span>
      </h2>

      {/* Enhanced Filters Section */}
      <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-200 mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-700 flex items-center gap-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            Filter Transactions
          </h3>

          {(selectedMonth || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 self-start sm:self-center"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Month Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none cursor-pointer hover:border-indigo-400 shadow-sm text-sm sm:text-base"
            >
              <option value="">All Months</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-7">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 appearance-none cursor-pointer hover:border-purple-400 shadow-sm text-sm sm:text-base"
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
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-7">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex items-end sm:col-span-2 lg:col-span-1">
            <Pdf selectedMonth={selectedMonth} />
          </div>
        </div>

        {/* Filter Results Info */}
        {(selectedMonth || selectedCategory) && (
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-800">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="break-words">
                Showing {filteredData.length} of {data.length} transactions
                {selectedMonth && ` • Month: ${selectedMonth}`}
                {selectedCategory &&
                  ` • Category: ${
                    selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)
                  }`}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="min-h-[300px] bg-white rounded-xl shadow-inner border-2 border-gray-100 p-4 sm:p-6">
        <ul className="space-y-3 sm:space-y-4 max-h-[50vh] sm:max-h-[400px] overflow-y-scroll pr-1 sm:pr-2">
          {filteredData.length > 0 ? (
            filteredData.map((obj) => (
              <li
                key={obj.id}
                className="bg-gradient-to-r from-white to-blue-50 rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200 hover:border-indigo-300 transform hover:scale-[1.01]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h1 className="text-base sm:text-lg font-bold text-gray-800 mb-1 truncate">
                          {obj.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-3 h-3 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-xs">{obj.date}</span>
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${
                              obj.type.toLowerCase() === "income"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-red-100 text-red-800 border border-red-200"
                            }`}
                          >
                            {obj.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="bg-gradient-to-r from-emerald-50 to-green-100 p-2 sm:p-3 rounded-lg border border-green-200">
                        <p className="text-xs text-gray-600 mb-0.5">Amount</p>
                        <p
                          className={`text-sm sm:text-base font-bold break-words ${
                            obj.type.toLowerCase() === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {obj.type.toLowerCase() === "income" ? "+" : "-"}₹
                          {obj.amount}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-100 p-2 sm:p-3 rounded-lg border border-purple-200">
                        <p className="text-xs text-gray-600 mb-0.5">Category</p>
                        <p className="text-sm sm:text-base font-semibold text-purple-700 truncate">
                          {obj.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col gap-2 sm:ml-4 justify-end sm:justify-start">
                    {/* View Button */}
                    <div className="w-10 h-10">
                      <button
                        onClick={() => handleDetail(obj)}
                        className="w-full h-full flex items-center justify-center p-2 bg-gradient-to-r from-blue-500 to-indigo-600 
        hover:from-blue-600 hover:to-indigo-700 
        rounded-lg shadow-md hover:shadow-md 
        transition-transform duration-200 transform hover:scale-105"
                        title="View Details"
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/3589/3589034.png"
                          alt="details"
                          className="w-4 h-4 filter brightness-0 invert"
                        />
                      </button>
                    </div>

                    {/* Edit Button */}
                    <div className="w-10 h-10">
                      <button
                        onClick={() => handleEdit(obj)}
                        className="w-full h-full flex items-center justify-center p-2 bg-gradient-to-r from-green-500 to-emerald-600 
        hover:from-green-600 hover:to-emerald-700 
        rounded-lg shadow-md hover:shadow-md 
        transition-transform duration-200 transform hover:scale-105"
                        title="Edit Transaction"
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                          alt="edit"
                          className="w-4 h-4 filter brightness-0 invert"
                        />
                      </button>
                    </div>

                    {/* Delete Button */}
                    <div className="w-10 h-10">
                      <button
                        onClick={() => handleDelete(obj)}
                        className="w-full h-full flex items-center justify-center p-2 bg-gradient-to-r from-red-500 to-pink-600 
        hover:from-red-600 hover:to-pink-700 
        rounded-lg shadow-md hover:shadow-md 
        transition-transform duration-200 transform hover:scale-105"
                        title="Delete Transaction"
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                          alt="delete"
                          className="w-4 h-4 filter brightness-0 invert"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="flex flex-col items-center justify-center py-12 sm:py-16 text-gray-500">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <p className="text-3xl sm:text-4xl">📊</p>
              </div>
              <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 text-center">
                {data.length === 0
                  ? "No transactions added yet."
                  : "No transactions match your filters."}
              </p>
              <p className="text-gray-500 text-center max-w-sm leading-relaxed px-4 text-sm sm:text-base">
                {data.length === 0
                  ? "Start by adding your first expense and watch your financial journey unfold!"
                  : "Try adjusting your filters to see more transactions."}
              </p>
              {(selectedMonth || selectedCategory) && data.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm sm:text-base"
                >
                  Clear Filters
                </button>
              )}
            </li>
          )}
        </ul>

        {isOpen && (
          <Edit
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            transactionToEdit={transactionToEdit}
            onSave={handleSave}
          />
        )}

        {selectedTransaction && (
          <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl max-w-sm sm:max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 border-2 border-indigo-200">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-opacity-90 p-4 sm:p-6 rounded-t-2xl">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="truncate">Transaction Details</span>
                </h2>
              </div>

              <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Title
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800 break-words">
                    {selectedTransaction.title}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-3 sm:p-4 rounded-xl border border-green-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Amount
                  </p>
                  <p
                    className={`text-xl sm:text-2xl font-bold ${
                      selectedTransaction.type.toLowerCase() === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedTransaction.type.toLowerCase() === "income"
                      ? "+"
                      : "-"}
                    ₹{selectedTransaction.amount}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:p-4 rounded-xl border border-purple-200">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Category
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-purple-700 break-words">
                      {selectedTransaction.category}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 sm:p-4 rounded-xl border border-orange-200">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Type
                    </p>
                    <span
                      className={`inline-block px-2 sm:px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedTransaction.type.toLowerCase() === "income"
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                      }`}
                    >
                      {selectedTransaction.type}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 sm:p-4 rounded-xl border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">Date</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800">
                    {selectedTransaction.date}
                  </p>
                </div>

                <button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 ease-in-out hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
                  onClick={() => setselectedTransaction(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="flex items-center justify-center mt-4"
        onClick={handleDeleteAll}
      >
        <button
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500
              text-white font-bold py-2 px-6 rounded-full
              shadow-lg hover:from-blue-600 hover:to-violet-400
              hover:scale-105 transform transition-all duration-300
              flex items-center gap-2"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Delete All
        </button>
      </div>
    </div>
  );
};

export default ListExpense;

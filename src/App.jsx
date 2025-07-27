import AddExpense from "./components/AddExpense";
import ListExpense from "./components/ListExpense";
import "./App.css";
import DisplayBoard from "./components/DisplayBoard";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Suggestion from "./components/Suggestion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [showSuggestion, setShowSuggestion] = useState(false);

  

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-gradient-to-br from-violet-100/20 to-purple-100/20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Enhanced Header */}
        <header className="mx-5 mt-5 mb-8">
          <div className="bg-gradient-to-r from-violet-600 via-violet-700 to-purple-700 text-white rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            {/* Header Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                <span className="text-2xl">💰</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight bg-gradient-to-r from-white to-violet-100 bg-clip-text text-transparent">
                Financial Management System
              </h1>

              <p className="text-violet-100 text-base md:text-lg font-medium opacity-90 max-w-2xl mx-auto leading-relaxed">
                Professional expense tracking and financial analytics platform
              </p>

              <div className="flex justify-center space-x-6 mt-6">
                <div className="flex items-center space-x-2 text-violet-200">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Tracking</span>
                </div>
                <div className="flex items-center space-x-2 text-violet-200">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    Real-time Analytics
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="px-5 pb-8">
          {/* Display Board Section */}
          <section className="mb-8">
            <div className="transform transition-all duration-500 hover:scale-[1.01]">
              <DisplayBoard />
            </div>
          </section>

          {/* Add Expense and List Section */}
          <section>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📊</span>
                </div>
                <span>Manage Transactions</span>
              </h2>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Add Expense Card */}
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-lg border border-slate-200 p-6 h-full transition-all duration-300 hover:shadow-xl hover:border-violet-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">➕</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        Add Transaction
                      </h3>
                    </div>
                    <AddExpense />
                  </div>
                </div>

                {/* List Expense Card */}
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-lg border border-slate-200 p-6 h-full transition-all duration-300 hover:shadow-xl hover:border-violet-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">📋</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        Transaction History
                      </h3>
                    </div>
                    <ListExpense />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <Dashboard />
          </section>
        </main>
      </div>

      <div className="fixed bottom-8 right-8 z-20">
        <button
          onClick={() => setShowSuggestion(true)}
          className="w-44 h-14 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
        >
          <span className="text-white text-lg mr-2">ℹ️</span>
          <span className="text-white text-base font-semibold">Suggestion</span>
        </button>
      </div>
      
      {showSuggestion && (
        <div className="fixed inset-0 bg-black/60 z-30 flex items-center justify-center">
          <div className="relative z-40 w-full max-w-2xl">
            <button
              onClick={() => setShowSuggestion(false)}
              className="absolute top-4 right-4 z-50 text-white bg-black/40 hover:bg-black/70 rounded-full p-2"
            >
              ✖
            </button>
            <Suggestion />
          </div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;

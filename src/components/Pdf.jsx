import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useSelector } from "react-redux";

// Helper to convert "03" or 3 to "March"
function getMonthName(monthValue) {
  // Accepts "03", 3, "3", etc.
  const num = parseInt(monthValue, 10);
  if (isNaN(num) || num < 1 || num > 12) return monthValue;
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[num - 1];
}

// Helper: get all unique months in your expenses, formatted as "Month YYYY"
function getUniqueMonths(expenses) {
  const months = expenses.map((t) => {
    if (!t.date) return null;
    const dateObj = new Date(t.date);
    return dateObj.toLocaleString("default", { month: "long", year: "numeric" });
  });
  return Array.from(new Set(months.filter(Boolean)));
}

// Helper: If the value is a number or "03", return the name with year if possible
function getDisplayMonth(selectedMonth, expenses) {
  // Handles cases: "03" or 3 or just "March 2025"
  if (!selectedMonth || selectedMonth === "All Months") return "All Months";
  // If it's already a name, just return
  if (isNaN(selectedMonth)) return selectedMonth;
  // Try to find year from expenses if possible
  const found = expenses.find((t) => {
    const dateObj = new Date(t.date);
    return dateObj.getMonth() + 1 === parseInt(selectedMonth, 10);
  });
  if (found) {
    const dateObj = new Date(found.date);
    return `${getMonthName(selectedMonth)} ${dateObj.getFullYear()}`;
  }
  // Fallback to just name
  return getMonthName(selectedMonth);
}

const Pdf = ({ selectedMonth }) => {
  const expenses = useSelector((state) => state.Transaction.expense);

  // Get the correct display month (handles "03" etc)
  const monthName = getDisplayMonth(selectedMonth, expenses);

  // Filter using both cases: user might pass "03", or "March 2025"
  const filtered =
    selectedMonth && selectedMonth !== "All Months"
      ? expenses.filter((t) => {
          if (!t.date) return false;
          const dateObj = new Date(t.date);
          const fullMonth = dateObj.toLocaleString("default", {
            month: "long",
            year: "numeric",
          });
          // Accept if selectedMonth is numeric and matches, or matches full string
          if (!isNaN(selectedMonth)) {
            return (
              dateObj.getMonth() + 1 === parseInt(selectedMonth, 10)
            );
          }
          return fullMonth === selectedMonth;
        })
      : expenses;

  // Group by category
  const grouped = {};
  filtered.forEach((t) => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });

  // Totals
  const totalExpense = filtered
    .filter((t) => t.type && t.type.toLowerCase() === "expense")
    .reduce((sum, t) => {
      const amt =
        typeof t.amount === "number" && Number.isFinite(t.amount)
          ? t.amount
          : typeof t.amount === "string" && !isNaN(Number(t.amount)) && t.amount.trim() !== ""
          ? Number(t.amount)
          : 0;
      return sum + amt;
    }, 0);

  const totalIncome = filtered
    .filter((t) => t.type && t.type.toLowerCase() === "income")
    .reduce((sum, t) => {
      const amt =
        typeof t.amount === "number" && Number.isFinite(t.amount)
          ? t.amount
          : typeof t.amount === "string" && !isNaN(Number(t.amount)) && t.amount.trim() !== ""
          ? Number(t.amount)
          : 0;
      return sum + amt;
    }, 0);

  const net = totalIncome - totalExpense;

  const handleDownload = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.text("Expense Report", 105, 18, { align: "center" });
    doc.setFontSize(14);
    doc.text(`${monthName}`, 105, 28, { align: "center" });

    // Summary
    doc.setFontSize(11);
    autoTable(doc, {
      startY: 35,
      head: [["Total Expense", "Total Income", "Net"]],
      body: [
        [
          `Rs.${totalExpense.toLocaleString()}`,
          `Rs.${totalIncome.toLocaleString()}`,
          `Rs.${net.toLocaleString()}`,
        ],
      ],
      headStyles: { fillColor: [79, 70, 229] },
      bodyStyles: { fontStyle: "bold" },
      theme: "striped",
      styles: { halign: "center" },
    });

    let y = doc.lastAutoTable.finalY + 8;

    if (filtered.length === 0) {
      doc.setFontSize(12);
      doc.text("No transactions found for this month.", 20, y + 10);
    } else {
      // For each category, print a table of its transactions
      Object.entries(grouped).forEach(([category, items]) => {
        doc.setFontSize(13);
        doc.setTextColor(87, 13, 159);
        doc.text(category, 20, y + 10);

        // Table
        autoTable(doc, {
          startY: y + 14,
          head: [["Date", "Title", "Type", "Amount (Rs.)"]],
          body: items.map((item) => [
            item.date
              ? new Date(item.date).toLocaleDateString("default", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "-",
            item.product || item.title || "-",
            item.type || "-",
            (
              typeof item.amount === "number" && Number.isFinite(item.amount)
                ? item.amount
                : (
                  typeof item.amount === "string" && !isNaN(Number(item.amount)) && item.amount.trim() !== ""
                    ? Number(item.amount)
                    : undefined
                )
            ) !== undefined
              ? `Rs.${Number(item.amount).toLocaleString()}`
              : "-"
          ]),
          headStyles: { fillColor: [139, 92, 246] },
          theme: "grid",
          styles: { fontSize: 10 },
        });
        // Category total
        const categoryTotal = items.reduce(
          (sum, t) => {
            const amt =
              typeof t.amount === "number" && Number.isFinite(t.amount)
                ? t.amount
                : typeof t.amount === "string" && !isNaN(Number(t.amount)) && t.amount.trim() !== ""
                ? Number(t.amount)
                : 0;
            return sum + (t.type && t.type.toLowerCase() === "expense" ? -amt : amt);
          },
          0
        );
        y = doc.lastAutoTable.finalY;
        doc.setFontSize(10);
        doc.setTextColor(55, 65, 81);
        doc.text(`Subtotal: Rs.${categoryTotal.toLocaleString()}`, 150, y + 7, {
          align: "right",
        });
        y += 15;
      });
    }

    // Footer (page numbers)
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${pageCount}`, 200, 290, { align: "right" });
    }

    doc.save(`Expense_Report_${monthName.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="flex items-end sm:col-span-2 lg:col-span-1">
      <button
        className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center gap-2 transform hover:scale-105 text-sm sm:text-base"
        onClick={handleDownload}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
        Download
      </button>
    </div>
  );
};

export default Pdf;
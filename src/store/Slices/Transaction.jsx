import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const Transaction = createSlice({
  name: "Transaction",
  initialState: {
    expense: [],
  },
  reducers: {
    AddTransaction(state, action) {
      state.expense.push(action.payload);
    },
    DeleteTransaction(state, action) {
      state.expense = state.expense.filter(
        (obj) => obj.id != action.payload.id
      );
    },
    DeleteAllTransaction(state) {
      state.expense = [];
    },
    editTransaction(state, action) {
      const { id, updatedData } = action.payload;
      const index = state.expense.findIndex((txn) => txn.id === id);
      if (index !== -1) {
        state.expense[index] = { ...state.expense[index], ...updatedData };
      }
    },
  },
});

export const { AddTransaction, DeleteTransaction, DeleteAllTransaction, editTransaction } =
  Transaction.actions;
export default Transaction;

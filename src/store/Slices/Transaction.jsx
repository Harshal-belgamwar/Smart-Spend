import React from 'react'
import { createSlice } from '@reduxjs/toolkit'


const Transaction = createSlice(
    {
        name:'Transaction',
        initialState:{
           expense: []
        },
        reducers:{
            AddTransaction(state,action){
                state.expense.push(action.payload);
            },
            DeleteTransaction(state,action){
                state.expense=state.expense.filter((obj)=>obj.id!=action.payload.id)
            },
            DeleteAllTransaction(state){
                state.expense=[]
            }

        }

    }
)

export const {AddTransaction,DeleteTransaction,DeleteAllTransaction} =Transaction.actions;
export default Transaction;
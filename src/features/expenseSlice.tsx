import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";;
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase'
import  type  { AppDispatch } from '../store/store.ts'

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
  place?: string;
  image?: string;
};

type ExpenseState = {
  list: Expense[];
};

const initialState: ExpenseState = {
  list: []
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.list = action.payload;
    }
  }
});

export const { setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
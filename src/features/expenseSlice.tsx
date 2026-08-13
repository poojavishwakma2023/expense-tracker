import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";;
import type { Expenses } from "../types/expense";



type ExpenseState = {
  list: Expenses[];
};

const initialState: ExpenseState = {
  list: []
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenseData: (state, action: PayloadAction<Expense[]>) => {

      state.list = action.payload;
    }
  }
});

export const { setExpenseData } = expenseSlice.actions;
export default expenseSlice.reducer;
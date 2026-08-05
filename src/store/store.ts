import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/expenseSlice";
import addExpenseReducer from '../features/addExpenseSlice'

export const store = configureStore({
    reducer:{
        expenses:expenseReducer,
        addExpense:addExpenseReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
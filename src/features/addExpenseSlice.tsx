import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Expense = {
    id: string;
    title: string;
    amount: number;
    category?: string;
    date: string;
    createdAt: string;
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



const addExpenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action:PayloadAction<Expense>) => {
            console.log('list from addexpense slice', action.payload)
            state.list.push(action.payload);
        },
        updateExpense: (state, action:PayloadAction<Expense>) => {
            const index = state.list.findIndex(
                e => e.id === action.payload.id
            );
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        }
    }
});

export const { addExpense, updateExpense } = addExpenseSlice.actions;
export default addExpenseSlice.reducer;
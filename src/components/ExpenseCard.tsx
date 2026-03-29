import React from 'react'
import '../stylesComponent/expensecard.css'
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot,deleteDoc ,doc } from 'firebase/firestore'
import { db } from '../../firebase'

interface Expense {
    id: string;
    title: string;
    amount: number;
    category: string;
    note?: string;
    place?: string;
    date: string;
}

interface Props {
    expense: Expense;
}

const ExpenseCard = ({ expense }: Props) => {
    console.log('expense ',expense)
    const noteText = expense.note?.trim();
    const navigate = useNavigate()

    const deleteExpense = async (id: string) => {
        try {
            await deleteDoc(doc(db, "expenses", id));
            alert("Expense deleted successfully");
        } catch (error) {
            console.log("Error deleting expense", error);
        }
    };
    return (
        <div className="expense-card">

            <div className="expense-header">
                <h3>{expense.title}</h3>
                <span className="amount">₹{expense.amount}</span>
            </div>

            <div className="expense-body">
                <p><b>Category:</b> {expense.category}</p>
                <p><b>Location:</b> {expense.place || "-"}</p>
                <p><b>Date:</b> {expense.date}</p>
                {noteText ? (
                    <p><b>Note:</b> {noteText}</p>
                ) : null}
            </div>
            <div className="expense-actions">
                <button className="edit-btn" onClick={() =>
                    navigate("/dashboard/addExpense", { state: expense })
                }
                >Edit</button>
                <button className="delete-btn" onClick={()=>{deleteExpense(expense.id)}}>Delete</button>
            </div>

        </div>
    )
}

export default ExpenseCard
import { useState, useEffect } from 'react'
import { collection, onSnapshot,deleteDoc ,doc } from 'firebase/firestore'
import { db } from '../../firebase'
import ExpenseCard from '../components/ExpenseCard'

interface Expenses {
  id: string;
  title: string;
  amount: number;
  category: string;
  note?: string;
  place?: string;
  date: string;
}

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expenses[]>([])

  useEffect(() => {

    const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
      const expenseList: Expenses[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Expenses, "id">)
      }));

      setExpenses(expenseList);
    });

    return () => unsubscribe(); // cleanup

  }, []);

 


  return (
    <>
      <div>ExpenseList</div>

      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </ul>
      )
      }
    </>
  )
}

export default ExpenseList;

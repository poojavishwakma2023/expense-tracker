
import ExpenseCard from '../components/ExpenseCard'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'



const ExpenseList = () => {
  const expenses = useSelector((state: RootState) => state.expenses.list)


  return (
    <>
      <title>Expenses | Expense Tracker</title>
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

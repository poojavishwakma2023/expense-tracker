import type { Expenses } from "../types/expense";
import '../stylesComponent/recentTransaction.css'
interface RecentTransactionsProps {
  expenses: Expenses[];
}

function RecentTransactions({ expenses }: RecentTransactionsProps) {
  console.log('props from dashboard', expenses)

  const recentExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (

    <>
      <div>RecentTransactions</div>
      <div className="transactions-container">
        {recentExpenses.map((expense) => (
          <div className="transaction-card" key={expense.id}>

            <div className="transaction-content">

              <div className="transaction-left">
                <img
                  src={expense.image}
                  alt={expense.title}
                  className="transaction-image"
                />

                <div className="transaction-info">
                  <span className="transaction-title">
                    {expense.title}
                  </span>

                  <span className="transaction-date">
                    {formatDateTime(expense.createdAt!)}
                  </span>
                </div>
              </div>

              <span className="transaction-amount">
                ₹{expense.amount}
              </span>

            </div>

          </div>
        ))}
      </div>

    </>

  )
}

export default RecentTransactions
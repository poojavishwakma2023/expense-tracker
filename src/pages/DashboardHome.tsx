
import SummaryCards from '../components/SummaryCards'
import ExpenseChart from '../components/ExpenseChart'
import RecentTransactions from '../components/RecentTransactions'
import MonthlyFilter from '../components/MonthlyFilter'
import QuickActions from '../components/QuickActions'
import  type { RootState } from '../store/store'
import { useSelector } from 'react-redux'


function DashboardHome() {
    const expenses=useSelector((state:RootState)=>state.expenses.list)


    return (
        <>
            <title>Dashboard | Expense Tracker</title>
            <meta name="description" content="Overview of your income, expenses and balance" />
            <div style={{...styles.text,  margin: "40px auto" }}>
                {/* SUMMARY CARDS */}
                <SummaryCards />
                {/* <div>Summery -total balance,total income,total expense</div> */}
                {/* Recent Transactions */}
                {/* <div>Recent Transactions - Last 5 expenses: with category , amount,date </div> */}
                <RecentTransactions expenses={expenses} />
                {/* Expense Chart */}
                {/* <div>Expense Chart - Food, Travel ,Rent,Shopping</div> */}
                <ExpenseChart />
                {/* Monthly Filter */}
                {/* <div>Monthly Filter - Current Month expenses ,This month vs last month</div> */}
                <MonthlyFilter />
                {/* Quick Actions */}
                {/* <div>Quick Actions- Add Expense , View Reports</div> */}
                <QuickActions />
                {/* <SummaryCards income={50000} expense={totalExpense} />
        <ExpenseForm onAdd={addExpense} />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        <ExpenseChart expenses={expenses} /> */}
            </div>
        </>

    )
}

export default DashboardHome

const styles = {
    text: {
        // color:'black'
    }
}
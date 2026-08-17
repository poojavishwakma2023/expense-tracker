import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { RootState } from "../store/store";
import "../stylesComponent/expenseChart.css";

const ExpenseChart = () => {
  const expenses = useSelector(
    (state: RootState) => state.expenses.list
  );

  // Current month
  const currentMonth = new Date().toISOString().slice(0, 7);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Get months available in expenses
  const months = useMemo(() => {
    const uniqueMonths = new Set(
      expenses.map((expense) => expense.date.slice(0, 7))
    );

    // Also show current month
    uniqueMonths.add(currentMonth);

    return Array.from(uniqueMonths).sort().reverse();
  }, [expenses, currentMonth]);

  // Filter expenses by selected month
  const filteredExpenses = useMemo(() => {
    return expenses.filter(
      (expense) => expense.date.slice(0, 7) === selectedMonth
    );
  }, [expenses, selectedMonth]);

  // Category-wise total
  const chartData = useMemo(() => {
    const categoryTotals: Record<string, number> = {};

    filteredExpenses.forEach((expense) => {
      const category = expense.category || "Other";

      categoryTotals[category] =
        (categoryTotals[category] || 0) + expense.amount;
    });

    return Object.entries(categoryTotals).map(
      ([category, amount]) => ({
        category,
        amount,
      })
    );
  }, [filteredExpenses]);

  // Total spending
  const totalExpense = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // Format month
  const formatMonth = (month: string) => {
    const date = new Date(`${month}-01`);

    return date.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="expense-chart">

      {/* Header */}
      <div className="expense-chart-header">

        <div>
          <h2>Spending by Category</h2>

          <p>
            Total spending: ₹
            {totalExpense.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Month Filter */}
        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(e.target.value)
          }
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {formatMonth(month)}
            </option>
          ))}
        </select>

      </div>

      {/* Chart */}
      {chartData.length === 0 ? (
        <div className="no-chart-data">
          <p>
            No expenses found for{" "}
            {formatMonth(selectedMonth)}
          </p>
        </div>
      ) : (
        <div className="chart-container">

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 10,
                bottom: 20,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="category"
              />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN")}`
                }
              />

              <Bar
                dataKey="amount"
                name="Expense"
                fill="#4f46e5"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>
      )}

    </section>
  );
};

export default ExpenseChart;
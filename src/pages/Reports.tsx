import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";

import type { RootState } from "../store/store";
import "../stylesComponent/reports.css";

const Reports = () => {
  const expenses = useSelector(
    (state: RootState) => state.expenses.list
  );

  // Current month
  const currentMonth = new Date().toISOString().slice(0, 7);

  const [selectedMonth, setSelectedMonth] =
    useState(currentMonth);

  // --------------------------------
  // Available months
  // --------------------------------

  const months = useMemo(() => {
    const uniqueMonths = new Set(
      expenses.map((expense) => expense.date.slice(0, 7))
    );

    uniqueMonths.add(currentMonth);

    return Array.from(uniqueMonths).sort().reverse();
  }, [expenses, currentMonth]);

  // --------------------------------
  // Selected month expenses
  // --------------------------------

  const filteredExpenses = useMemo(() => {
    return expenses.filter(
      (expense) =>
        expense.date.slice(0, 7) === selectedMonth
    );
  }, [expenses, selectedMonth]);

  // --------------------------------
  // Total spending
  // --------------------------------

  const totalSpending = useMemo(() => {
    return filteredExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  }, [filteredExpenses]);

  // --------------------------------
  // Average daily spending
  // --------------------------------

  const averageDailySpending = useMemo(() => {
    if (filteredExpenses.length === 0) {
      return 0;
    }

    const uniqueDays = new Set(
      filteredExpenses.map((expense) => expense.date)
    );

    return totalSpending / uniqueDays.size;
  }, [filteredExpenses, totalSpending]);

  // --------------------------------
  // Highest expense
  // --------------------------------

  const highestExpense = useMemo(() => {
    if (filteredExpenses.length === 0) {
      return null;
    }

    return filteredExpenses.reduce((highest, expense) =>
      expense.amount > highest.amount
        ? expense
        : highest
    );
  }, [filteredExpenses]);

  // --------------------------------
  // Category totals
  // --------------------------------

  const categoryData = useMemo(() => {
    const categoryTotals: Record<string, number> = {};

    filteredExpenses.forEach((expense) => {
      const category = expense.category || "Other";

      categoryTotals[category] =
        (categoryTotals[category] || 0) + expense.amount;
    });

    return Object.entries(categoryTotals).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
  }, [filteredExpenses]);

  // --------------------------------
  // Highest spending category
  // --------------------------------

  const highestCategory = useMemo(() => {
    if (categoryData.length === 0) {
      return null;
    }

    return categoryData.reduce((highest, category) =>
      category.value > highest.value
        ? category
        : highest
    );
  }, [categoryData]);

  // --------------------------------
  // Daily spending for Line Chart
  // --------------------------------

  const dailySpendingData = useMemo(() => {
    const dailyTotals: Record<string, number> = {};

    filteredExpenses.forEach((expense) => {
      dailyTotals[expense.date] =
        (dailyTotals[expense.date] || 0) +
        expense.amount;
    });

    return Object.entries(dailyTotals)
      .sort(([dateA], [dateB]) =>
        dateA.localeCompare(dateB)
      )
      .map(([date, amount]) => ({
        date,
        amount,
      }));
  }, [filteredExpenses]);

  // --------------------------------
  // Top 5 expenses
  // --------------------------------

  const topExpenses = useMemo(() => {
    return [...filteredExpenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [filteredExpenses]);

  // --------------------------------
  // Format month
  // --------------------------------

  const formatMonth = (month: string) => {
    const date = new Date(`${month}-01`);

    return date.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  // --------------------------------
  // Format date
  // --------------------------------

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
      }
    );
  };

  return (
    <div className="reports-page">

      {/* Header */}

      <div className="reports-header">

        <div>
          <h1>Reports</h1>

          <p>
            Detailed analysis of your expenses
          </p>
        </div>

        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(e.target.value)
          }
        >
          {months.map((month) => (
            <option
              key={month}
              value={month}
            >
              {formatMonth(month)}
            </option>
          ))}
        </select>

      </div>

      {/* Summary Cards */}

      <div className="report-summary">

        <div className="report-card">
          <span>Total Spending</span>

          <strong>
            ₹{totalSpending.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="report-card">
          <span>Average / Day</span>

          <strong>
            ₹
            {Math.round(
              averageDailySpending
            ).toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="report-card">
          <span>Highest Expense</span>

          <strong>
            ₹
            {highestExpense
              ? highestExpense.amount.toLocaleString(
                  "en-IN"
                )
              : "0"}
          </strong>

          {highestExpense && (
            <small>
              {highestExpense.title}
            </small>
          )}
        </div>

        <div className="report-card">
          <span>Top Category</span>

          <strong>
            {highestCategory
              ? highestCategory.name
              : "No data"}
          </strong>

          {highestCategory && (
            <small>
              ₹
              {highestCategory.value.toLocaleString(
                "en-IN"
              )}
            </small>
          )}
        </div>

      </div>

      {/* Charts */}

      <div className="reports-grid">

        {/* Spending Trend */}

        <div className="report-section">

          <h2>Spending Trend</h2>

          {dailySpendingData.length === 0 ? (
            <div className="empty-report">
              No expense data available
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <LineChart
                data={dailySpendingData}
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
                  dataKey="date"
                  tickFormatter={formatDate}
                />

                <YAxis />

                <Tooltip
                  labelFormatter={(value) =>
                    formatDate(String(value))
                  }
                  formatter={(value) =>
                    `₹${Number(
                      value
                    ).toLocaleString("en-IN")}`
                  }
                />

                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />

              </LineChart>
            </ResponsiveContainer>
          )}

        </div>

        {/* Category Breakdown */}

        <div className="report-section">

          <h2>Category Breakdown</h2>

          {categoryData.length === 0 ? (
            <div className="empty-report">
              No expense data available
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >
                  {categoryData.map(
                    (entry, index) => (
                      <Cell key={entry.name} />
                    )
                  )}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(
                      value
                    ).toLocaleString("en-IN")}`
                  }
                />

                <Legend />

              </PieChart>
            </ResponsiveContainer>
          )}

        </div>

      </div>

      {/* Top Expenses */}

      <div className="top-expenses">

        <div className="top-expenses-header">
          <h2>Top Expenses</h2>

          <span>
            {formatMonth(selectedMonth)}
          </span>
        </div>

        {topExpenses.length === 0 ? (
          <div className="empty-report">
            No expenses found
          </div>
        ) : (
          <div className="expense-table">

            {topExpenses.map((expense) => (
              <div
                className="expense-row"
                key={expense.id}
              >

                <div className="expense-info">

                  <div className="expense-title">
                    {expense.title}
                  </div>

                  <div className="expense-category">
                    {expense.category ||
                      "Other"}
                    {" • "}
                    {formatDate(expense.date)}
                  </div>

                </div>

                <strong>
                  ₹
                  {expense.amount.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default Reports;
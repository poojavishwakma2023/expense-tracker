
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../src/components/ProtectedRoute'
import { lazy, Suspense } from 'react'


const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DashboardHome = lazy(() => import('./pages/DashboardHome'));
const AddExpense = lazy(() => import('./pages/AddExpense'));
const ExpenseList = lazy(() => import('./pages/ExpenseList'));
const Reports = lazy(() => import('./pages/Reports'));
const Profile = lazy(() => import('./pages/Profile'));

// import ProtectedRoute from './components/ProtectedRoute';


function App() {

  return (
    <Suspense fallback={<h1>Loading......</h1> }>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>}>

          {/* child pages */}
          {/* DEFAULT PAGE */}
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="expenses" element={<ExpenseList />} />
          <Route path="addExpense" element={<AddExpense />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

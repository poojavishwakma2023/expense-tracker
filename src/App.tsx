
import './App.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard'
import DashboardHome from './pages/DashboardHome'
import AddExpense from './pages/AddExpense'
import ExpenseList from './pages/ExpenseList'
import Reports from './pages/Reports'
import Profile from './pages/Profile'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../src/components/ProtectedRoute'
;

function App() {
//   const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
  // const querySnapshot = await getDocs(collection(db, "expenses"));

  // const data = querySnapshot.docs.map(doc => ({
  //   id: doc.id,
  //   ...doc.data()
  // }));

  // setExpenses(data);
  // console.log('data from app',expenses)
};

// useEffect(() => {
//   fetchExpenses();
// }, []);


  return (
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
  )
}

export default App

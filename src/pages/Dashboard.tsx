
import { useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { setExpenseData } from '../features/expenseSlice'
import type {Expenses} from '../types/expense'




const Dashboard = () => {
  const dispatch = useDispatch()

      useEffect(() => {
    
        const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
          const expenseList: Expenses[] = snapshot.docs.map((doc) => {
            const data = doc.data()
            return {
              id: doc.id,
              title: data.title,
              amount: data.amount,
              category: data.category,
              note: data.note,
              place: data.place,
              date: data.date,
              image: data.image,
              createdAt:
                data.createdAt?.toDate instanceof Function
                  ? data.createdAt.toDate().toISOString()
                  : data.createdAt,
            }
          });
          
          dispatch(setExpenseData(expenseList))
        });
    
        return () => unsubscribe(); // cleanup
    
      }, [dispatch]);


  return (
    <div style={styles.layout}>
      <Sidebar />

      <main style={styles.content}>
        <Header />
        {/* CHILD PAGES RENDER HERE */}
        <Outlet />
      </main>
    </div>

  )
}

export default Dashboard
const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    padding: "20px",
    // background: "#f3f4f6",
  },
};
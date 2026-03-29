import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
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

import { signOut } from "firebase/auth";
import { auth } from '../../firebase'
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut(auth)
        navigate('/login')
    }

    const userEmail = auth.currentUser?.email

    return (
        <header className="app-header">
            {/* left  */}
            <span className="app-name">DailyExpense</span>
            {/* right */}
            <div className="header-right">
                <span className="user-email">{userEmail}</span>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    )
}

export default Header
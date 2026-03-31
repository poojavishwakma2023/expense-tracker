import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import { CiCircleList } from "react-icons/ci";
import { FaChartBar } from "react-icons/fa";

const Sidebar = () => {
    const [open, setOpen] = useState(true);

    return (
        <div
            style={{
                ...styles.sidebar,
                width: open ? "220px" : "70px",
            }}
        >
            {/* TOGGLE BUTTON */}
            <div
                style={styles.toggle}
                onClick={() => setOpen(!open)}>
                ☰
            </div>

            {/* MENU */}
            <ul style={styles.menu}>
                <li>
                    <NavLink to="/dashboard" style={styles.link}>
                        <span><AiOutlineHome size={20} /></span>
                        {open && <span style={styles.text}>Home</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/profile" style={styles.link}>
                        <span><HiOutlineUserCircle size={20} /></span>
                        {open && <span style={styles.text}>Profile</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/addExpense" style={styles.link} >
                        <span><FiPlus size={20} /></span>
                        {open && <span style={styles.text}>AddExpense</span>}
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/dashboard/expenses" style={styles.link}>
                        <span><CiCircleList size={20} /></span>
                        {open && <span style={styles.text}>Expenses</span>}
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/dashboard/reports" style={styles.link}>
                        <span><FaChartBar size={20} /></span>
                        {open && <span style={styles.text}>Reports</span>}
                    </NavLink>
                </li>

                {/* <li>
                    <NavLink to="/dashboard/logout" style={styles.link}>
                        <span>🚪</span>
                        {open && <span style={styles.text}>Logout</span>}
                    </NavLink>
                </li> */}
            </ul>
        </div>
    );
}

export default Sidebar;
const styles: Record<string, React.CSSProperties> = {
    sidebar: {
        minHeight: "100vh",
        backgroundColor: "#1f2937", // dark gray
        color: "#ffffff",
        transition: "width 0.3s ease",
        overflow: "hidden",  
    },

    toggle: {
        padding: "15px",
        cursor: "pointer",
        fontSize: "22px",
        borderBottom: "1px solid #374151",
        // textAlign: "center",
    },

    menu: {
        listStyle: "none",
        padding: "10px",
        margin: 0,
    },

    link: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 10px",
        color: "#e5e7eb",
        textDecoration: "none",
        borderRadius: "6px",
        marginBottom: "6px",
        transition: "background 0.2s",
    },

    activeLink: {
        backgroundColor: "#374151",
        color: "#ffffff",
    },

    text: {
        whiteSpace: "nowrap",
        fontSize: "14px",
    },
};

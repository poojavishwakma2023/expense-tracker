import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase';
import { useState } from "react";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [pswd, setPswd] = useState('')
    const [visible, setVisible] = useState(false)

    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, pswd);
            alert("Signup successful");
            navigate("/dashboard");
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <input
                className="email-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />


            <div className="password-wrapper">

                <input
                    className="pswd-input"
                    type={visible ? "text" : "password"}
                    placeholder="Password"
                    value={pswd}
                    onChange={(e) => setPswd(e.target.value)} />
                <i
                    className={`fa-solid ${visible ? "fa-eye-slash" : "fa-eye"
                        } eye-icon`}
                    onClick={() => setVisible(!visible)}
                ></i>

            </div>


            <button
                className="register-btn"
                onClick={handleSignup}>
                Register
            </button>

            <p
                className="login-text"
                onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
                Already have account? Login
            </p>
        </div>
    );
}
export default Signup; 

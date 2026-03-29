import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false)

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        className="email-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />


      <div className="password-wrapper">
        <input
          className="pswd-input"
          type={visible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i
          className={`fa-solid ${visible ? "fa-eye-slash" : "fa-eye"
            } eye-icon`}
          onClick={() => setVisible(!visible)}
        ></i>


      </div>




      <button
        className="login-btn"
        onClick={handleLogin}>Login</button>

      <p
        className="register-text"
        onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
        Create account
      </p>
    </div>
  );
}

export default Login;
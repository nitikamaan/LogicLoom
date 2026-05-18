import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const user = JSON.parse(localStorage.getItem("registeredUser"));

    if (!user) return alert("No account found");

    if (email === user.email && password === user.password) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <p>Welcome back 👋</p>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button className="primary-btn" onClick={login}>
          Login
        </button>

        <p className="bottom-text">
          No account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
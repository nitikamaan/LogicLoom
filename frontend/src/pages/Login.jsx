import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://syncbasebackend.onrender.com/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Login to continue</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input name="email" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>

          <button className="primary-btn">Login</button>
        </form>

        <p className="link-text">
          No account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
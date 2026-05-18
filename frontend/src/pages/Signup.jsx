import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const signup = () => {
    if (!data.name || !data.email || !data.password)
      return alert("Fill all fields");

    localStorage.setItem("registeredUser", JSON.stringify(data));

    alert("Signup successful");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Register to continue</p>

        <input placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />

        <button className="primary-btn" onClick={signup}>
          Register
        </button>

        <p className="bottom-text">
          Already have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
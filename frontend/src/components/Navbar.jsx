import Navbar from "../components/Navbar.jsx";import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>AI Complaint System</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-complaint">Add</Link>
        <Link to="/complaints">Complaints</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
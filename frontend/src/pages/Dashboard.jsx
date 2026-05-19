import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <h2>AI Complaint System</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="dashboard">
        <h1>Dashboard</h1>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Add Complaint</h3>
            <p>Register a new complaint</p>
            <Link to="/add-complaint">
              <button className="primary-btn">Go</button>
            </Link>
          </div>

          <div className="dashboard-card">
            <h3>View Complaints</h3>
            <p>Track all complaints</p>
            <Link to="/complaints">
              <button className="primary-btn">View</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h1>AI Employee System</h1>

      <div className="nav">
        <Link to="/add">Add Employee</Link>
        <Link to="/employees">View Employees</Link>
        <Link to="/ai">AI Recommendation</Link>
      </div>
    </div>
  );
}
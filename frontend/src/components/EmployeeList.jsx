import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees().then(res => setEmployees(res.data));
  }, []);

  return (
    <div className="page">
      <div className="container">

        <h2>Employees</h2>

        <div className="employee-grid">
          {employees.map(e => (
            <div className="employee-card" key={e._id}>
              <h3>{e.name}</h3>
              <p>{e.email}</p>

              <span className="badge">{e.department}</span>
              <span className="badge green">{e.performanceScore}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
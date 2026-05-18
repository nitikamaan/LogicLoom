import { useEffect, useState } from "react";
import {
  addEmployee,
  getEmployees,
  deleteEmployee,
  getAIRecommendation
} from "../services/api";

import SearchFilter from "../components/SearchFilter";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: ""
  });

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.log("Error loading employees");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    await addEmployee({
      ...form,
      skills: form.skills.split(","),
      performanceScore: Number(form.performanceScore),
      experience: Number(form.experience)
    });

    setForm({
      name: "",
      email: "",
      department: "",
      skills: "",
      performanceScore: "",
      experience: ""
    });

    loadEmployees();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  const handleAI = async (emp) => {
    try {
      setLoadingAI(true);

      const res = await getAIRecommendation(emp);

      setAiResult(res.data.choices[0].message.content);
    } catch (err) {
      setAiResult("AI Error");
    } finally {
      setLoadingAI(false);
    }
  };

  const filteredEmployees = employees.filter((e) =>
    e.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="container">

        {/* ================= HEADER ================= */}
        <div className="topbar">
          <div>
            <h1>Employee AI Dashboard</h1>
            <p style={{ color: "#94a3b8" }}>
              Manage employees & get AI insights
            </p>
          </div>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>

        {/* ================= ADD EMPLOYEE ================= */}
        <div className="card">
          <h2>Add Employee</h2>

          <form onSubmit={handleAdd} className="grid">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />

            <input
              placeholder="Skills (React,Node,AI)"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />

            <input
              type="number"
              placeholder="Performance Score"
              value={form.performanceScore}
              onChange={(e) =>
                setForm({ ...form, performanceScore: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Experience"
              value={form.experience}
              onChange={(e) =>
                setForm({ ...form, experience: e.target.value })
              }
            />

            <button className="primary-btn">Add Employee</button>
          </form>
        </div>

        {/* ================= SEARCH ================= */}
        <SearchFilter onSearch={setSearch} />

        {/* ================= EMPLOYEE GRID ================= */}
        <div className="employee-grid">
          {filteredEmployees.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No employees found</p>
          ) : (
            filteredEmployees.map((emp) => (
              <div className="employee-card" key={emp._id}>

                <h3>{emp.name}</h3>
                <p style={{ color: "#94a3b8" }}>{emp.email}</p>

                <div style={{ margin: "10px 0" }}>
                  <span className="badge">{emp.department}</span>
                  <span className="badge green">
                    ⭐ {emp.performanceScore}
                  </span>
                </div>

                <p style={{ fontSize: "13px", color: "#94a3b8" }}>
                  {emp.experience} years experience
                </p>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button
                    className="primary-btn"
                    onClick={() => handleAI(emp)}
                  >
                    AI Insight
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* ================= AI RESULT ================= */}
        {(aiResult || loadingAI) && (
          <div className="ai-card">
            <h2>AI Recommendation</h2>

            {loadingAI ? (
              <p>Analyzing employee...</p>
            ) : (
              <pre>{aiResult}</pre>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
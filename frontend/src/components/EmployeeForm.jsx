import { useState } from "react";
import { addEmployee } from "../services/api";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    await addEmployee({
      ...form,
      skills: form.skills.split(","),
      performanceScore: Number(form.performanceScore),
      experience: Number(form.experience)
    });

    alert("Employee Added");
  };

  return (
    <div className="page">
      <div className="container card">

        <h2>Add Employee</h2>

        <form onSubmit={submit}>
          <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Department" onChange={(e) => setForm({ ...form, department: e.target.value })} />
          <input placeholder="Skills" onChange={(e) => setForm({ ...form, skills: e.target.value })} />
          <input type="number" placeholder="Score" onChange={(e) => setForm({ ...form, performanceScore: e.target.value })} />
          <input type="number" placeholder="Experience" onChange={(e) => setForm({ ...form, experience: e.target.value })} />

          <button className="primary-btn">Submit</button>
        </form>

      </div>
    </div>
  );
}
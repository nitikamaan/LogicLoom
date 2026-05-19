import { useState } from "react";
import axios from "axios";

function ComplaintForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [ai, setAi] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitComplaint = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // 1. SAVE COMPLAINT
      const res = await axios.post(
        "https://syncbasebackend.onrender.com/api/complaints",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(res.data.message);

      // 2. AI ANALYSIS
      const aiRes = await axios.post(
        "https://syncbasebackend.onrender.com/api/ai/analyze",
        {
          description: form.description,
        }
      );

      setAi(aiRes.data);

      // OPTIONAL RESET FORM
      setForm({
        name: "",
        email: "",
        title: "",
        description: "",
        category: "",
        location: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="form-container">

      <h1 className="form-title">
        Register Complaint
      </h1>

      <form onSubmit={submitComplaint}>

        {/* NAME */}
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* EMAIL */}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* TITLE */}
        <div className="input-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Complaint title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="input-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe your issue..."
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* CATEGORY */}
        <div className="input-group">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Category
            </option>
            <option value="Water">
              Water Supply
            </option>
            <option value="Electricity">
              Electricity
            </option>
            <option value="Garbage">
              Sanitation
            </option>
            <option value="Road">
              Road Issue
            </option>
          </select>
        </div>

        {/* LOCATION */}
        <div className="input-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        <button className="primary-btn">
          Submit Complaint
        </button>

      </form>

      {/* ================= AI RESULT ================= */}

      {ai && (
        <div className="ai-box">

          <h2>AI Analysis Result</h2>

          <p>
            <b>Priority:</b> {ai.priority}
          </p>

          <p>
            <b>Department:</b>{" "}
            {ai.department}
          </p>

          <p>
            <b>Summary:</b> {ai.summary}
          </p>

          <p>
            <b>Auto Response:</b>{" "}
            {ai.response}
          </p>

        </div>
      )}

    </div>
  );
}

export default ComplaintForm;
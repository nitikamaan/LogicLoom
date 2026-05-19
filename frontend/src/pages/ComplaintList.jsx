import { useEffect, useState } from "react";
import axios from "axios";

function ComplaintList() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 👇 track which complaint AI is open
  const [openAI, setOpenAI] = useState(null);

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://syncbasebackend.onrender.com/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= DELETE =================
  const deleteComplaint = async (id) => {
    await axios.delete(
      `https://syncbasebackend.onrender.com/api/complaints/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchData();
  };

  // ================= UPDATE =================
  const updateStatus = async (id, status) => {
    await axios.put(
      `https://syncbasebackend.onrender.com/api/complaints/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchData();
  };

  const filtered = (data || []).filter((c) =>
    c.location?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading complaints...</p>;

  return (
    <div className="complaints-container">
      <h1>Complaints</h1>

      {/* SEARCH */}
      <input
        className="search-box"
        placeholder="Search location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LIST */}
      {filtered.map((c) => (
        <div className="complaint-card" key={c._id}>
          <h2>{c.title}</h2>

          <p>{c.description}</p>
          <p><b>Location:</b> {c.location}</p>
          <p><b>Status:</b> {c.status}</p>

          {/* ================= AI BUTTON ================= */}
          <button
            className="primary-btn"
            style={{ marginTop: "10px" }}
            onClick={() =>
              setOpenAI(openAI === c._id ? null : c._id)
            }
          >
            {openAI === c._id
              ? "Hide AI Analysis"
              : "Show AI Analysis"}
          </button>

          {/* ================= AI BOX ================= */}
          {openAI === c._id && (
            <div className="ai-box">
              <h3>AI Analysis</h3>

              <p>
                <b>Priority:</b> {c.priority || "N/A"}
              </p>

              <p>
                <b>Department:</b> {c.department || "N/A"}
              </p>

              <p>
                <b>Summary:</b> {c.aiSummary || "N/A"}
              </p>

              <p>
                <b>Auto Response:</b>{" "}
                {c.autoResponse || "N/A"}
              </p>
            </div>
          )}

          {/* ================= ACTIONS ================= */}
          <div className="action-btns">
            <select
              className="update-select"
              onChange={(e) =>
                updateStatus(c._id, e.target.value)
              }
            >
              <option value="">Update Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <button
              className="delete-btn"
              onClick={() => deleteComplaint(c._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ComplaintList;
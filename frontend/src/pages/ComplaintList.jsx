import { useEffect, useState } from "react";
import axios from "axios";

function ComplaintList() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // ================= FETCH COMPLAINTS =================
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://syncbasebackend.onrender.com/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`, // FIXED
          },
        }
      );

      setData(res.data.data); // FIXED (backend sends {data: []})
    } catch (error) {
      console.log(
        "FETCH ERROR:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= DELETE =================
  const deleteComplaint = async (id) => {
    try {
      await axios.delete(
        "https://syncbasebackend.onrender.com/api/complaints/${id}",
        {
          headers: {
            Authorization: `Bearer ${token}`, // FIXED
          },
        }
      );

      fetchData();
    } catch (error) {
      console.log(
        "DELETE ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        "https://syncbasebackend.onrender.com/api/complaints/${id}",
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`, // FIXED
          },
        }
      );

      fetchData();
    } catch (error) {
      console.log(
        "UPDATE ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // ================= SAFE FILTER =================
  const filtered = (data || []).filter((c) =>
    c.location
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

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
      {filtered.length === 0 ? (
        <p>No complaints found</p>
      ) : (
        filtered.map((c) => (
          <div
            className="complaint-card"
            key={c._id}
          >
            <h2>{c.title}</h2>

            <p>{c.description}</p>

            <p>
              <b>Location:</b> {c.location}
            </p>

            <p>
              <b>Status:</b> {c.status}
            </p>

            {/* ACTIONS */}
            <div className="action-btns">
              <select
                className="update-select"
                onChange={(e) =>
                  updateStatus(
                    c._id,
                    e.target.value
                  )
                }
              >
                <option value="">
                  Update Status
                </option>
                <option value="Pending">
                  Pending
                </option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Resolved">
                  Resolved
                </option>
              </select>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteComplaint(c._id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ComplaintList;
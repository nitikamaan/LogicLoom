function ComplaintCard({
  complaint,
  deleteComplaint,
  updateStatus,
}) {
  return (
    <div className="complaint-card">

      <h2>{complaint.title}</h2>

      <p>
        <b>Name:</b> {complaint.name}
      </p>

      <p>
        <b>Email:</b> {complaint.email}
      </p>

      <p>
        <b>Description:</b> {complaint.description}
      </p>

      <p>
        <b>Category:</b> {complaint.category}
      </p>

      <p>
        <b>Location:</b> {complaint.location}
      </p>

      <div className="status">
        {complaint.status}
      </div>

      {complaint.priority && (
        <p>
          <b>Priority:</b> {complaint.priority}
        </p>
      )}

      {complaint.department && (
        <p>
          <b>Department:</b> {complaint.department}
        </p>
      )}

      <div className="action-btns">

        <select
          className="update-select"
          onChange={(e) =>
            updateStatus(
              complaint._id,
              e.target.value
            )
          }
        >
          <option>Update Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        <button
          className="delete-btn"
          onClick={() =>
            deleteComplaint(complaint._id)
          }
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default ComplaintCard;
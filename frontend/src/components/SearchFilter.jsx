import { useState } from "react";

export default function SearchFilter({ onSearch }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    onSearch(v);
  };

  return (
    <div className="card" style={{ marginBottom: "15px" }}>
      <h3 style={{ marginBottom: "10px" }}>Search Employees</h3>

      <input
        className="search-input"
        type="text"
        placeholder="Search by department, name..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
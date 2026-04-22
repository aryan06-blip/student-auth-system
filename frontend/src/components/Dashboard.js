import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [student, setStudent] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("https://student-auth-backend-0o4p.onrender.com/api/dashboard", {
      headers: { authorization: token }
    }).then(res => setStudent(res.data));
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "auto" }}>
        <h2 className="text-center mb-4">Student Dashboard</h2>

        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>

        <button className="btn btn-danger w-100 mt-3" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await axios.post("https://student-auth-backend.onrender.com/api/login", form);

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "auto" }}>
        <h2 className="text-center mb-4">Login</h2>

        <input className="form-control mb-3" placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}/>

        <input className="form-control mb-3" placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}/>

        <button className="btn btn-success w-100" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
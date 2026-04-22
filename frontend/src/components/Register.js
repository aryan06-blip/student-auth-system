import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/register", form);
    alert(res.data.message);
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "auto" }}>
        <h2 className="text-center mb-4">Register</h2>

        <input className="form-control mb-3" placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}/>

        <input className="form-control mb-3" placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}/>

        <input className="form-control mb-3" placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}/>

        <input className="form-control mb-3" placeholder="Course"
          onChange={(e)=>setForm({...form,course:e.target.value})}/>

        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
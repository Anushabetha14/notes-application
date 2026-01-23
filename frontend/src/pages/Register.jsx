import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", form);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="container">
      <form onSubmit={submit} style={styles.card}>
        <h2 style={styles.heading}>Notes Application – Registration</h2>

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          required
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          type="password"

          
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button style={styles.btn}>Register</button>

        <p style={styles.text}>
          Already have account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    maxWidth: "420px",
    margin: "40px auto",
    boxShadow: "0 6px 10px rgba(0,0,0,0.15)"
  },

  heading: {
    marginBottom: "15px",
    fontSize: "20px"
  },

  btn: {
    marginTop: "10px",
    width: "100%"
  },

  text: {
    marginTop: "10px",
    fontSize: "14px"
  }
};

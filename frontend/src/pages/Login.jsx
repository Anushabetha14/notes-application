import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <form onSubmit={submit} style={styles.card}>
        <h2 style={styles.heading}>Notes Application – Login</h2>

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

        <button style={styles.btn}>Login</button>

        <p style={styles.text}>
          New user? click on <a href="/register">Register</a>
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

  text: {
    marginTop: "10px",
    fontSize: "14px"
  },

  btn: {
    marginTop: "10px",
    width: "100%"
  }
};

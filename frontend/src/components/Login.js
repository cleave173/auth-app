import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    if (password.length > 20) return "Құпиясөз 20 таңбадан аспауы керек.";
    if (!/[A-Z]/.test(password)) return "Құпиясөзде кемінде бір бас әріп болуы керек.";
    if (!/^[A-Za-z0-9]+$/.test(password)) return "Құпиясөз тек әріптер мен сандардан тұруы керек.";
    return "";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      setMessage(passwordError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      setMessage("✅ Дұрыс! Сәтті кірдіңіз.");
      setSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.error || "❌ Қате! Қолданушы табылмады.");
      setSuccess(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Кіру</h2>
      {message && <p className={`message ${success ? "success" : "error"}`}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Құпиясөз"
          className="input-field"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {passwordError && <p className="error-text">{passwordError}</p>}

        <button type="submit" className="login-button" disabled={passwordError}>
          Кіру
        </button>
      </form>
    </div>
  );
}

export default Login;

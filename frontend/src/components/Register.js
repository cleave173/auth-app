import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
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

    if (password !== confirmPassword) {
      setMessage("Құпиясөздер сәйкес емес!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        password,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Қате орын алды");
    }
  };

  return (
    <div className="register-container">
      <h2>Тіркелу</h2>
      {message && <p className="message">{message}</p>}
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

        <input
          type="password"
          placeholder="Құпиясөзді растау"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="register-button" disabled={passwordError}>
          Тіркелу
        </button>
      </form>
    </div>
  );
}

export default Register;

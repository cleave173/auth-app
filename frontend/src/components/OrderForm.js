import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

function OrderForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [delivery, setDelivery] = useState("standart");
  const [payment, setPayment] = useState("card");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!email.includes("@")) newErrors.email = "Қате email форматы";
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) newErrors.phone = "Телефон форматы: 777-123-4567";
    if (product.length < 3) newErrors.product = "Тауар атауы кемінде 3 әріптен тұруы керек";
    if (address.length < 5) newErrors.address = "Мекенжай тым қысқа";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axios.post("http://localhost:5000/order", {
        email,
        phone,
        product,
        quantity,
        delivery,
        payment,
        address,
        comment,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Қате орын алды");
    }
  };

  return (
    <div className="form-container">
      <h2>Тапсырыс беру</h2>
      {message && <p className="message-text">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input type="tel" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        {errors.phone && <p className="error-text">{errors.phone}</p>}
        <input type="text" placeholder="Тауар атауы" value={product} onChange={(e) => setProduct(e.target.value)} required />
        {errors.product && <p className="error-text">{errors.product}</p>}
        <input type="number" placeholder="Саны" value={quantity} onChange={(e) => setQuantity(e.target.value)} required min="1" />
        <select value={delivery} onChange={(e) => setDelivery(e.target.value)} required>
          <option value="standart">Стандарт</option>
          <option value="express">Экспресс</option>
        </select>
        <select value={payment} onChange={(e) => setPayment(e.target.value)} required>
          <option value="card">Карта</option>
          <option value="cash">Қолма-қол</option>
        </select>
        <input type="text" placeholder="Мекенжай" value={address} onChange={(e) => setAddress(e.target.value)} required />
        {errors.address && <p className="error-text">{errors.address}</p>}
        <textarea placeholder="Пікіріңіз" value={comment} onChange={(e) => setComment(e.target.value)} />
        
        {errors.agreement && <p className="error-text">{errors.agreement}</p>}
        <button type="submit">Жіберу</button>
      </form>
    </div>
  );
}

export default OrderForm;

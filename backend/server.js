// require("dotenv").config();
// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { Pool } = require("pg");
// const cors = require("cors");

// // 🚀 Express қосымшасын бастау
// const app = express();

// // ✅ PostgreSQL-ге қосылу
// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
// });

// app.use(express.json());
// app.use(cors());

// // ✅ Тіркелу маршруты (Register)
// app.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     console.log("🔹 Тіркелу сұранысы алынды:", email);

//     if (!email || !password) {
//       console.log("❌ Қате: Email немесе құпиясөз енгізілмеген.");
//       return res.status(400).json({ error: "Барлық өрістерді толтырыңыз" });
//     }

//     // Қолданушының бұрын тіркелгенін тексеру
//     const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (existingUser.rowCount > 0) {
//       console.log("❌ Қате: Бұл email базада бар.");
//       return res.status(400).json({ error: "Бұл email тіркелген" });
//     }

//     // Парольді хэштеу
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Жаңа қолданушыны қосу
//     const newUser = await pool.query(
//       "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
//       [email, hashedPassword]
//     );

//     console.log("✅ Қолданушы сәтті тіркелді:", newUser.rows[0]);
//     res.status(201).json({ message: "Тіркелу сәтті аяқталды!" });
//   } catch (error) {
//     console.error("❌ Тіркелу қатесі:", error);
//     res.status(500).json({ error: "Қате! Қолданушы тіркелмеді." });
//   }
// });

// // ✅ Кіру маршруты (Login)
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(`🔹 Логин сұранысы: email=${email}`);

//     // Қолданушыны базадан іздеу
//     const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

//     if (user.rowCount === 0) {
//       console.log("❌ Қате: Қолданушы табылмады!");
//       return res.status(401).json({ error: "Қолданушы табылмады!" });
//     }

//     console.log("✅ Қолданушы табылды:", user.rows[0].email);

//     // Құпиясөзді тексеру
//     const isValid = await bcrypt.compare(password, user.rows[0].password);
//     if (!isValid) {
//       console.log("❌ Қате: Құпиясөз дұрыс емес!");
//       return res.status(401).json({ error: "Қате құпиясөз!" });
//     }

//     console.log("✅ Құпиясөз дұрыс!");

//     // JWT токен жасау
//     const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     console.log("🔹 Қолданушыға токен берілді.");
//     res.json({ message: "Сәтті кірдіңіз!", token });
//   } catch (error) {
//     console.error("❌ Кіру қатесі:", error);
//     res.status(500).json({ error: "Қате! Қолданушы кіре алмады." });
//   }
// });

// // ✅ Серверді іске қосу
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Сервер ${PORT} портында іске қосылды`);
// });




require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

app.use(express.json());
app.use(cors());

app.post("/order", async (req, res) => {
  const { email, phone, product, quantity, delivery, payment, address, comment } = req.body;
  await pool.query(
    "INSERT INTO orders (email, phone, product, quantity, delivery, payment, address, comment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [email, phone, product, quantity, delivery, payment, address, comment]
  );
  res.json({ message: "Тапсырыс қабылданды!" });
});

app.listen(5000, () => console.log("Сервер іске қосылды"));

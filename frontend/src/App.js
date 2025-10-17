// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import "./styles.css"; // Стильдерді қосу

// function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <nav>
//           <Link to="/login">Кіру</Link> | <Link to="/register">Тіркелу</Link>
//         </nav>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;




import React from "react";
import OrderForm from "./components/OrderForm";

function App() {
  return (
    <div>
      <OrderForm />
    </div>
  );
}

export default App;

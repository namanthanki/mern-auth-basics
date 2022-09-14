import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import './App.css';

const Register = lazy(() => import("./views/Register.js"));
const Login = lazy(() => import("./views/Login.js")); 
const Dashboard = lazy(() => import("./views/Dashboard.js"));

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

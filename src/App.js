import "./App.css";
import AdminLogin from "./Components/AdminLogin";
import { Route, Routes } from "react-router-dom";
import AdminRegister from "./Components/AdminRegister";
import UserRegister from "./Components/UserRegister/UserRegister";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/register" element={<UserRegister />} />
    </Routes>
  );
}

export default App;

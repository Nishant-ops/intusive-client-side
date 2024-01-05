import "./App.css";
import AdminLogin from "./Components/AdminLogin";
import { Route, Routes } from "react-router-dom";
import AdminRegister from "./Components/AdminRegister";
import UserRegister from "./Components/UserRegister/UserRegister";
import AdminDashboard from "./Components/AdminDashboard";
import Home from "./Components/Home/Home";
import AuthVerify from "./AuthRoute/AuthRoute";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("access-token");
    localStorage.removeItem("email");
    navigate("/login");
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthVerify logout={logout}>
            <Home />
          </AuthVerify>
        }
      />
      <Route
        path="/admin"
        element={
          <AuthVerify logout={logout}>
            <AdminDashboard />
          </AuthVerify>
        }
      />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/admin/register" element={<AdminRegister />} />
    </Routes>
  );
}

export default App;

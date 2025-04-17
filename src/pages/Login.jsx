import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { getFromStorage } from "../utils/localStorage";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    const users = getFromStorage("users") || [];
    const user = users.find(
      (u) => u.username === data.username && u.password === data.password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
}

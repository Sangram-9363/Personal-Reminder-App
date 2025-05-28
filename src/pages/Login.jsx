import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { getFromStorage } from "../utils/localStorage";
import AuthPage from "./AuthPage";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    const users = getFromStorage("users") || [];
    const user = users.find(
      (u) =>
        u.email.trim() === data.email.trim() && u.password === data.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div >
      <AuthPage type="login" onSubmit={handleLogin} />
    </div>
  );
}

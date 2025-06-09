import { useNavigate } from "react-router-dom";
import { getFromStorage } from "../utils/localStorage";
import AuthPage from "./AuthPage";
import Notification from "../components/Notification";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleLogin = (data) => {
    const users = getFromStorage("users") || [];
    const user = users.find(
      (u) =>
        u.email.trim() === data.email.trim() && u.password === data.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setNotification({
        message: `Congratulations Login sucessfull 🎉`,
        type: "success",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      setNotification({
        message: `Invalid email or password`,
        type: "error",
      });
    }
  };

  return (
    <div>
      <AuthPage type="login" onSubmit={handleLogin} />
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
    </div>
  );
}

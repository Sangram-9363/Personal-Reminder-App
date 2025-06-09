import { useNavigate } from "react-router-dom";
import { getFromStorage, saveToStorage } from "../utils/localStorage";
import AuthPage from "./AuthPage";
import { useState } from "react";
import Notification from "../components/Notification";

const Signup = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleSignup = (data) => {
    const users = getFromStorage("users") || [];
    const exists = users.find((u) => u.email.trim() === data.email.trim());

    if (exists) {
      setNotification({
        message: `user with email ${data.email} is already exist`,
        type: "error",
      });
      return;
    }

    const cleanedData = {
      ...data,
      email: data.email.trim(),
      username: data.username.trim(),
    };

    users.push(cleanedData);
    saveToStorage("users", users);
    setNotification({
      message: `Signup successful! Please log in.`,
      type: "success",
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div>
      <AuthPage type="signup" onSubmit={handleSignup} />
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
    </div>
  );
};

export default Signup;

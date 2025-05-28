import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { getFromStorage, saveToStorage } from "../utils/localStorage";
import AuthPage from "./AuthPage";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (data) => {
    const users = getFromStorage("users") || [];
    const exists = users.find((u) => u.email.trim() === data.email.trim());

    if (exists) {
      alert(`User with email ${data.email} already exists!`);
      return;
    }

    const cleanedData = {
      ...data,
      email: data.email.trim(),
      username: data.username.trim(),
    };

    users.push(cleanedData);
    saveToStorage("users", users);
    alert("Signup successful! Please log in.");
    navigate("/login");
  };

  return (
    <div>
      <AuthPage type="signup" onSubmit={handleSignup} />
    </div>
  );
};

export default Signup;

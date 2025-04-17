import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { getFromStorage, saveToStorage } from "../utils/localStorage";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (data) => {
    const users = getFromStorage("users") || [];
    const exists = users.find((u) => u.username === data.username);
    if (exists) {
      alert("Username already exists!");
      return;
    }
    users.push(data);
    saveToStorage("users", users);
    alert("Signup successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
};

export default Signup;

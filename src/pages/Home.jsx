import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/localStorage";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-slate-400 p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 text-center">
        Personal Reminders Web App
      </h1>

      <p className="text-lg md:text-xl text-gray-700 text-center max-w-xl mb-8">
        Manage your tasks, get notified, and stay organized with your own
        personal reminder system. Add, view, sort, and track reminders in one
        place!
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

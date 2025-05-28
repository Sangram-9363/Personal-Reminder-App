// src/components/AuthForm.jsx
import { useState } from "react";

export default function AuthForm({ type, onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (type === "signup" && !formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }
    if (!/^\d{6}$/.test(formData.password)) {
      newErrors.password = "Password must be 6 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <h2 className="text-3xl font-semibold text-center mb-8 tracking-tight drop-shadow-md ">
        {type === "login" ? "Welcome Back" : "Create Account"}
      </h2>

      {type === "signup" && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">{errors.username}</p>
          )}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          maxLength="6"
          value={formData.password}
          onChange={handleChange}
          placeholder="6-digit password"
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
        />
        {errors.password && (
          <p className="text-red-400 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {type === "login" && (
        <div className="text-right mb-6">
          <button
            type="button"
            className="text-sm text-blue-200 hover:underline"
            onClick={() =>
              alert("Forgot Password functionality not implemented yet")
            }
          >
            Forgot Password?
          </button>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      >
        {type === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}

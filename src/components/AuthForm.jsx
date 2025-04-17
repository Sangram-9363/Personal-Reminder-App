import { useState } from "react";

export default function AuthForm({ type, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (type === "signup" && !formData.fullName)
      newErrors.fullName = "Full Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (!formData.username) newErrors.username = "Username is required";
    if (!/^\d{6}$/.test(formData.password))
      newErrors.password = "Password must be 6 digits";
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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-6 rounded shadow"
    >
      {type === "signup" && (
        <div className="mb-4">
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>
      )}
      <div className="mb-4">
        <label className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block font-medium">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-medium">Password</label>
        <input
          type="password"
          name="password"
          maxLength="6"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {type === "login" && (
        <div className="text-right mb-4">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
      >
        {type === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function Reminders() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dateTime: "",
    priority: "Medium",
    repeat: "None",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title || form.title.length > 180)
      newErrors.title = "Title is required (max 180 chars)";
    if (!form.description || form.description.length > 500)
      newErrors.description = "Description is required (max 500 chars)";
    if (!form.dateTime) newErrors.dateTime = "Date and Time are required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const existing = JSON.parse(localStorage.getItem("reminders")) || [];

    const newReminder = {
      ...form,
      id: uuid(),
      username: currentUser.username,
      createdAt: new Date().toISOString(),
    };

    const updated = [...existing, newReminder];
    localStorage.setItem("reminders", JSON.stringify(updated));
    alert("Reminder added!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Reminder
        </h2>

        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            maxLength="180"
            placeholder="e.g. Call Mom 📞"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            maxLength="500"
            rows="3"
            placeholder="Reminder details..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={form.dateTime}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm">{errors.dateTime}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-medium">Repeat</label>
          <select
            name="repeat"
            value={form.repeat}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option>None</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Save Reminder
        </button>
      </form>
    </div>
  );
}

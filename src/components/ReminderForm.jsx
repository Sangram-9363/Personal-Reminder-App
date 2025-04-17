import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  getCurrentUser,
  getFromStorage,
  saveToStorage,
} from "../utils/localStorage";

const Reminders = () => {
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

    const currentUser = getCurrentUser();
    const reminders = getFromStorage("reminders") || [];

    const newReminder = {
      ...form,
      id: uuid(),
      username: currentUser.username,
      createdAt: new Date().toISOString(),
    };

    const updatedReminders = [...reminders, newReminder];
    saveToStorage("reminders", updatedReminders);

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

        <FormField
          label="Title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="e.g. Call Mom 📞"
          maxLength={180}
        />

        <FormField
          label="Description"
          name="description"
          as="textarea"
          rows="3"
          value={form.description}
          onChange={handleChange}
          error={errors.description}
          placeholder="Reminder details..."
          maxLength={500}
        />

        <FormField
          label="Date & Time"
          name="dateTime"
          type="datetime-local"
          value={form.dateTime}
          onChange={handleChange}
          error={errors.dateTime}
        />

        <FormSelect
          label="Priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
          options={["High", "Medium", "Low"]}
        />

        <FormSelect
          label="Repeat"
          name="repeat"
          value={form.repeat}
          onChange={handleChange}
          options={["None", "Daily", "Weekly"]}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Save Reminder
        </button>
      </form>
    </div>
  );
};

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder = "",
  as = "input",
  maxLength,
  rows,
}) {
  const Input = as;
  return (
    <div className="mb-4">
      <label className="block font-medium">{label}</label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 px-3 py-2 rounded"
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function FormSelect({ label, name, value, onChange, options }) {
  return (
    <div className="mb-4">
      <label className="block font-medium">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 px-3 py-2 rounded"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export default Reminders;

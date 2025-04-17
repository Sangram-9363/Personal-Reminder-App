import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReminderCard from "../components/ReminderCard";

export default function Dashboard() {
  const [reminders, setReminders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("reminders")) || [];
    const userReminders = stored.filter(
      (r) => r.username === currentUser.username
    );
    setReminders(userReminders);
  }, []);

  const now = new Date();

  const previousReminders = reminders
    .filter((r) => new Date(r.dateTime) < now)
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
    .slice(0, 5);

  const upcomingReminders = reminders
    .filter((r) => new Date(r.dateTime) >= now)
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
    .slice(0, 10);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">📌 Dashboard</h2>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => navigate("/reminders")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Add Reminder
          </button>
          <button
            onClick={() => navigate("/all-reminders")}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            📋 View All Reminders
          </button>
          <button
            onClick={() => navigate("/calendar")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            📅 Calendar View
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">
          ⏮️ Previous 5 Reminders
        </h3>
        <div className="grid gap-4">
          {previousReminders.length ? (
            previousReminders.map((r) => (
              <ReminderCard key={r.id} reminder={r} />
            ))
          ) : (
            <p className="text-gray-500">No previous reminders.</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-700">
          ⏭️ Upcoming 10 Reminders
        </h3>
        <div className="grid gap-4">
          {upcomingReminders.length ? (
            upcomingReminders.map((r) => (
              <ReminderCard key={r.id} reminder={r} />
            ))
          ) : (
            <p className="text-gray-500">No upcoming reminders.</p>
          )}
        </div>
      </div>
    </div>
  );
}

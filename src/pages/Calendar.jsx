import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay, format } from "date-fns";
import {
  getCurrentUser,
  getFromStorage,
  saveToStorage,
} from "../utils/localStorage";

export default function CalendarPage() {
  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyReminders, setDailyReminders] = useState([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    const stored = getFromStorage("reminders") || [];
    const userReminders = stored.filter(
      (r) => r.username === currentUser?.username
    );
    setReminders(userReminders);
  }, []);

  useEffect(() => {
    const selected = reminders.filter((r) =>
      isSameDay(new Date(r.dateTime), selectedDate)
    );
    setDailyReminders(selected);
  }, [selectedDate, reminders]);

  const handleDelete = (id) => {
    const updated = reminders.filter((r) => r.id !== id);
    setReminders(updated);
    saveToStorage("reminders", updated);
    alert("Reminder deleted.");
  };

  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <h2 className="text-2xl font-semibold mb-6">📅 Calendar View</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="bg-white p-2 rounded shadow"
        /> */}
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="bg-white p-2 rounded shadow"
          tileContent={({ date, view }) => {
            if (view === "month") {
              const dayReminders = reminders.filter((r) =>
                isSameDay(new Date(r.dateTime), date)
              );

              return (
                <div className="mt-1 space-y-0.5 px-1 overflow-hidden">
                  {dayReminders.slice(0, 2).map((r) => (
                    <p
                      key={r.id}
                      className="text-[10px] text-blue-700 truncate"
                    >
                      • {r.title}
                    </p>
                  ))}
                  {dayReminders.length > 2 && (
                    <p className="text-[10px] text-gray-500">
                      +{dayReminders.length - 2} more
                    </p>
                  )}
                </div>
              );
            }
            return null;
          }}
        />

        <div className="flex-1 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-4">
            Reminders for {format(selectedDate, "PPP")}
          </h3>

          {dailyReminders.length > 0 ? (
            dailyReminders.map((r) => (
              <div key={r.id} className="border p-3 rounded mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{r.title}</p>
                    <p className="text-sm text-gray-600">{r.description}</p>
                    <p className="text-sm text-gray-500">
                      Time: {format(new Date(r.dateTime), "p")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reminders for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import ReminderCard from "../components/ReminderCard";
import { isWithinInterval } from "date-fns";
import { getCurrentUser, getFromStorage } from "../utils/localStorage";

export default function AllReminders() {
  const [reminders, setReminders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    const stored = getFromStorage("reminders") || [];
    const userReminders = stored.filter(
      (r) => r.username === currentUser?.username
    );
    setReminders(userReminders);
    applyDefaultFilter(userReminders);
  }, []);

  const applyDefaultFilter = (allReminders) => {
    const today = new Date();
    const fifteenDaysAgo = new Date(today);
    fifteenDaysAgo.setDate(today.getDate() - 15);

    const recentReminders = allReminders.filter((r) => {
      const created = new Date(r.createdAt);
      return created >= fifteenDaysAgo && created <= today;
    });

    setFiltered(recentReminders);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let result = [...reminders];

    if (filters.start && filters.end) {
      const startDate = new Date(filters.start);
      const endDate = new Date(filters.end);
      result = result.filter((r) =>
        isWithinInterval(new Date(r.createdAt), {
          start: startDate,
          end: endDate,
        })
      );
    }

    setFiltered(result);
  }, [filters, reminders]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-semibold mb-4">
        All Reminders (Date Range)
      </h2>

      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="start"
            value={filters.start}
            onChange={handleFilterChange}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            name="end"
            value={filters.end}
            onChange={handleFilterChange}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4">
          {filtered.map((r) => (
            <ReminderCard key={r.id} reminder={r} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No reminders found for the selected date range.
        </p>
      )}
    </div>
  );
}

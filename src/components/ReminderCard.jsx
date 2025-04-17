import { format } from "date-fns";

export default function ReminderCard({ reminder }) {
  return (
    <div className="bg-white p-4 rounded shadow border">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-bold text-gray-800">{reminder.title}</h4>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            reminder.priority === "High"
              ? "bg-red-200 text-red-800"
              : reminder.priority === "Medium"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {reminder.priority}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-2">{reminder.description}</p>
      <p className="text-gray-500 text-sm">
        {format(new Date(reminder.dateTime), "PPpp")}
      </p>
    </div>
  );
}

import { format } from "date-fns";

export default function ReminderCard({ reminder }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border ">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-bold text-gray-800">{reminder.title}</h4>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            reminder.priority === "High"
              ? "bg-red-500 text-white font-medium"
              : reminder.priority === "Medium"
              ? "bg-yellow-500 text-white font-medium"
              : "bg-green-500 text-white font-medium"
          }`}
        >
          {reminder.priority}
        </span>
      </div>
      <p className="text-gray-800 text-sm mb-2 font-medium">
        {reminder.description}
      </p>
      <p className="text-gray-700 text-sm">
        {format(new Date(reminder.dateTime), "PPpp")}
      </p>
    </div>
  );
}

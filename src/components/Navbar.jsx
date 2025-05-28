import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, removeFromStorage } from "../utils/localStorage";
import {
  LogOut,
  LogIn,
  Calendar,
  PlusCircle,
  List,
  Home,
  User,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setIsMenuOpen(false); // Close menu on route change
  }, [location]);

  const handleLogout = () => {
    removeFromStorage("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-slate-500 via-slate-800 to-slate-800 backdrop-blur-lg bg-opacity-70 shadow-md sticky top-0 z-50 rounded-b-xl text-white ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white ">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide flex items-center gap-2"
        >
          📝 <span className="hidden sm:inline">Reminders</span>
        </Link>

        <button
          className="sm:hidden text-white hover:text-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden sm:flex items-center gap-5 text-sm font-medium">
          {currentUser && (
            <>
              <NavItem
                to="/dashboard"
                icon={<Home size={18} />}
                text="Dashboard"
              />
              <NavItem
                to="/reminders"
                icon={<PlusCircle size={18} />}
                text="Add"
              />
              <NavItem
                to="/all-reminders"
                icon={<List size={18} />}
                text="All"
              />
              <NavItem
                to="/calendar"
                icon={<Calendar size={18} />}
                text="Calendar"
              />
            </>
          )}

          {currentUser ? (
            <>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="capitalize">{currentUser.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-200 hover:text-red-100 transition"
              >
                <LogOut size={18} /> <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`flex items-center gap-1 hover:text-white ${
                  location.pathname === "/login"
                    ? "font-bold text-white underline"
                    : "text-gray-200 text-lg hover:scale-105 transition-all  mx-2"
                }`}
              >
                <LogIn size={18} /> Login
              </Link>
              <Link
                to="/signup"
                className={`flex items-center gap-1 hover:text-white ${
                  location.pathname === "/signup"
                    ? "font-bold text-white underline"
                    : "text-gray-200 text-lg hover:scale-105 transition-all"
                }`}
              >
                <User size={18} /> Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-3 bg-white bg-opacity-90 backdrop-blur rounded-b-lg text-gray-800">
          {currentUser && (
            <>
              <NavItem
                to="/dashboard"
                icon={<Home size={18} />}
                text="Dashboard"
              />
              <NavItem
                to="/reminders"
                icon={<PlusCircle size={18} />}
                text="Add"
              />
              <NavItem
                to="/all-reminders"
                icon={<List size={18} />}
                text="All"
              />
              <NavItem
                to="/calendar"
                icon={<Calendar size={18} />}
                text="Calendar"
              />
            </>
          )}

          {currentUser ? (
            <>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="capitalize">{currentUser.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 transition"
              >
                <LogOut size={18} /> <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`flex items-center gap-1 hover:text-blue-600 ${
                  location.pathname === "/login"
                    ? "font-bold text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <LogIn size={18} /> Login
              </Link>
              <Link
                to="/signup"
                className={`flex items-center gap-1 hover:text-blue-600 ${
                  location.pathname === "/signup"
                    ? "font-bold text-blue-600"
                    : "text-gray-700"
                }`}
              >
                <User size={18} /> Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

function NavItem({ to, icon, text }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-2 py-1 rounded transition-all ${
        isActive
          ? "text-white font-semibold border-b-2 border-white"
          : "text-gray-200 hover:text-white"
      }`}
    >
      {icon} <span>{text}</span>
    </Link>
  );
}

export default Navbar;

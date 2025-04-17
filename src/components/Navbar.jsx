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
    setIsMenuOpen(false); // Close mobile menu on route change
  }, [location]);

  const handleLogout = () => {
    removeFromStorage("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <nav className="backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-wide flex items-center gap-1"
        >
          📝 <span className="hidden sm:inline">Reminders</span>
        </Link>

        
        <button
          className="sm:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      
        <div className="hidden sm:flex items-center gap-4 text-sm text-gray-700 font-medium">
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
              <div className="flex items-center gap-2 text-gray-600">
                <User size={18} />
                <span className="font-medium capitalize">
                  {currentUser.username}
                </span>
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
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-3 bg-white border-t border-gray-200">
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
              <div className="flex items-center gap-2 text-gray-600">
                <User size={18} />
                <span className="font-medium capitalize">
                  {currentUser.username}
                </span>
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
      className={`flex items-center gap-2 px-2 py-1 rounded transition-all hover:text-blue-600 ${
        isActive
          ? "text-blue-600 font-semibold border-b-2 border-blue-500"
          : "text-gray-600"
      }`}
    >
      {icon} <span>{text}</span>
    </Link>
  );
}

export default Navbar;

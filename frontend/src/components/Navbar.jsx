import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import newRequest from "../lib/api";

const Navbar = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.delete("/auth/logout");
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800 tracking-tight transition">
          GigFlow
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-black transition">
            Find Work
          </Link>

          {currentUser ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-black transition">
                Dashboard
              </Link>

              <Link
                to="/add"
                className="bg-gray-900/80 hover:bg-gray-900 text-white text-xs font-medium px-4 py-2 rounded-full transition-all shadow-sm hover:shadow"
              >
                Post a Job
              </Link>

              <div className="flex items-center gap-3 pl-2 border-l border-gray-300/50">
                <span className="text-sm font-semibold text-gray-700">{currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-400 hover:text-red-500 font-medium transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-black transition">
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gray-900/80 hover:bg-gray-900 text-white text-xs font-medium px-5 py-2 rounded-full transition-all shadow-sm hover:shadow"
              >
                Join
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
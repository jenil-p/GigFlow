import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import newRequest from "../lib/api";

const Navbar = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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

        <div className="hidden md:flex items-center gap-8">
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

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-gray-600 hover:text-black focus:outline-none"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg flex flex-col items-center gap-6 py-8 animate-in slide-in-from-top-5">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-600 hover:text-black transition">
            Find Work
          </Link>

          {currentUser ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-600 hover:text-black transition">
                Dashboard
              </Link>
              <Link to="/add" onClick={() => setIsOpen(false)} className="bg-gray-900 text-white text-sm font-medium px-6 py-2 rounded-full shadow hover:bg-gray-800 transition">
                Post a Job
              </Link>
              <div className="flex flex-col items-center gap-2 pt-4 border-t border-gray-100 w-full">
                <span className="text-base font-semibold text-gray-800">Hi, {currentUser.name}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-sm text-red-500 font-medium hover:text-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-600 hover:text-black transition">
                Sign In
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="bg-gray-900 text-white text-sm font-medium px-6 py-2 rounded-full shadow hover:bg-gray-800 transition">
                Join
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
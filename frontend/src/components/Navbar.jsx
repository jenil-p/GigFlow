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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          GigFlow.
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">
            Find Work
          </Link>

          {currentUser ? (
            <div className="flex items-center gap-4">
              <Link to="/mygigs" className="text-gray-600 hover:text-blue-600 font-medium">
                My Gigs
              </Link>
              <Link
                to="/add"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition"
              >
                Post a Job
              </Link>
              <div className="flex items-center gap-2 ml-4">
                <span className="font-semibold text-gray-800">{currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-700 font-medium ml-2"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="font-medium text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition"
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
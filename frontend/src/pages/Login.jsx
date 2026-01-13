import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import newRequest from "../lib/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await newRequest.post("/auth/login", { email, password });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
            navigate("/");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Something went wrong!";
            setError(errorMessage);
            dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50/50 py-10">
            <div className="w-full max-w-md bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/60">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Welcome Back</h1>
                    <p className="text-gray-400 text-xs mt-2">Enter your credentials to access your account.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-transparent outline-none transition-all"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900/80 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md text-sm mt-2"
                    >
                        Sign In
                    </button>

                    {error && <span className="text-red-500 text-xs text-center bg-red-50 p-2 rounded-lg border border-red-100">{error}</span>}

                    <div className="text-center text-xs text-gray-400 mt-2">
                        Don't have an account? <Link to="/register" className="text-gray-800 font-semibold hover:underline">Join here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
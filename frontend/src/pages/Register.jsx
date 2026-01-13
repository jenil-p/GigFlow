import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import newRequest from "../lib/api";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await newRequest.post("/auth/register", formData);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[85vh] bg-gray-50/50 py-10">
            <div className="w-full max-w-md bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/60">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Create Account</h1>
                    <p className="text-gray-400 text-xs mt-2">Join GigFlow to find work or hire talent.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Full Name</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="e.g. John Doe"
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-transparent outline-none transition-all"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Phone Number</label>
                        <input
                            name="contactNumber"
                            type="number"
                            placeholder="e.g. 9876543210"
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-transparent outline-none transition-all"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-transparent outline-none transition-all"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-transparent outline-none transition-all"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900/80 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md text-sm mt-4"
                    >
                        Create Account
                    </button>

                    {error && <div className="p-3 bg-red-50 text-red-500 text-xs rounded-xl text-center border border-red-100">{error}</div>}

                    <div className="text-center text-xs text-gray-400 pt-2">
                        Already a member? <Link to="/login" className="text-gray-800 font-semibold hover:underline">Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
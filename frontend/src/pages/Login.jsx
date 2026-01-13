import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Sign in to GigFlow</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="johndoe@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition mt-2"
                    >
                        Login
                    </button>

                    {error && <span className="text-red-500 text-sm text-center">{error}</span>}
                </form>
            </div>
        </div>
    );
};

export default Login;
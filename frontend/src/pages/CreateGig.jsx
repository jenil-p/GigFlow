import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../lib/api";

const CreateGig = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
        currency: "USD",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await newRequest.post("/gigs", formData);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError("Failed to create gig.");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-10">
            <div className="max-w-xl w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Post a New Gig</h1>

                <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/60 flex flex-col gap-5">

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Job Title</label>
                        <input
                            name="title"
                            type="text"
                            placeholder="e.g. Build a React Website"
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-transparent outline-none transition-all"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Description</label>
                        <textarea
                            name="description"
                            rows="5"
                            placeholder="Describe requirements..."
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-transparent outline-none resize-none transition-all"
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/3">
                            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Currency</label>
                            <select
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 outline-none cursor-pointer"
                            >
                                <option value="USD">USD ($)</option>
                                <option value="INR">INR (₹)</option>
                            </select>
                        </div>

                        <div className="w-2/3">
                            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Budget</label>
                            <input
                                name="budget"
                                type="number"
                                min="1"
                                placeholder="100"
                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                    <button
                        type="submit"
                        className="mt-4 w-full bg-gray-900/80 hover:bg-gray-900 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow"
                    >
                        Publish Gig
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateGig;
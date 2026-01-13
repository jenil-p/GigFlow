import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../lib/api";

const CreateGig = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
        currency: "USD", // Default value
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
            setError("Failed to create gig. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Post a New Gig</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-6">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                        name="title"
                        type="text"
                        placeholder="e.g. Build a React Website"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        rows="6"
                        placeholder="Describe the requirements in detail..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none resize-none"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="flex gap-4">
                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none bg-white"
                        >
                            <option value="USD">USD ($)</option>
                            <option value="INR">INR (₹)</option>
                        </select>
                    </div>

                    <div className="w-2/3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                        <input
                            name="budget"
                            type="number"
                            min="1"
                            placeholder="100"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition mt-2"
                >
                    Publish Gig
                </button>
            </form>
        </div>
    );
};

export default CreateGig;
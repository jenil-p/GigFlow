import React, { useState } from "react";

const BidForm = ({ onSubmit, currencySymbol, error }) => {
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ price, message });
    };

    return (
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Submit Proposal</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Your Price ({currencySymbol})
                    </label>
                    <input
                        type="number"
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder="0.00"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Cover Letter
                    </label>
                    <textarea
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-gray-200 outline-none transition-all resize-none"
                        rows="5"
                        placeholder="Why are you the best fit for this role?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>

                {error && <p className="text-red-500 text-xs bg-red-50 p-2 rounded-lg text-center">{error}</p>}

                <button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-xl transition-all text-sm shadow-md hover:shadow-lg">
                    Send Proposal
                </button>
            </form>
        </div>
    );
};

export default BidForm;
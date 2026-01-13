import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newRequest from "../lib/api";

const Home = () => {
    const [gigs, setGigs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchGigs = async () => {
        setLoading(true);
        try {
            const res = await newRequest.get(`/gigs${search ? `?search=${search}` : ""}`);
            setGigs(res.data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchGigs();
    }, []);

    const getSymbol = (currency) => (currency === "INR" ? "₹" : "$");

    return (
        <div className="min-h-screen bg-gray-50/50 py-10">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Marketplace</h1>

                    <div className="relative w-full md:w-96 group">
                        <input
                            type="text"
                            placeholder="Search gigs..."
                            className="w-full pl-5 pr-28 py-3 rounded-full bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 outline-none transition-all shadow-sm"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            onClick={fetchGigs}
                            className="absolute right-1 top-1 bottom-1 bg-gray-900/80 hover:bg-gray-900 text-white px-5 rounded-full text-xs font-medium transition-all"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {loading ? (
                    <p className="text-gray-400 text-sm">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gigs.map((gig) => (
                            <div key={gig._id} className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
                                <div className="flex justify-between items-start mb-3">
                                    <h2 className="text-lg font-bold text-gray-800 truncate pr-4">{gig.title}</h2>
                                    <span className="bg-gray-100/80 text-gray-700 text-[10px] px-2.5 py-1 rounded-full font-bold">
                                        {getSymbol(gig.currency)}{gig.budget}
                                    </span>
                                </div>

                                <p className="text-gray-500 text-xs mb-6 line-clamp-3 leading-relaxed font-light">
                                    {gig.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto border-t border-gray-100/50 pt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                            {gig.ownerId?.name?.charAt(0) || "U"}
                                        </div>
                                        <span className="text-xs text-gray-500 font-medium">{gig.ownerId?.name || "User"}</span>
                                    </div>
                                    <Link
                                        to={`/gig/${gig._id}`}
                                        className="text-xs font-semibold text-gray-900 hover:text-gray-600 transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {gigs.length === 0 && !loading && (
                            <div className="col-span-full text-center text-gray-400 py-20 italic font-light">
                                No active gigs found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
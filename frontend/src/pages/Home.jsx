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

    const handleSearch = () => {
        fetchGigs();
    };

    // Helper for Symbol
    const getSymbol = (currency) => (currency === "INR" ? "₹" : "$");

    return (
        <div className="py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Available Gigs</h1>

                <div className="flex w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search by title (e.g. Logo)..."
                        className="border border-gray-300 rounded-l-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </div>
            </div>

            {loading ? (
                <p>Loading gigs...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gigs.map((gig) => (
                        <div key={gig._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-bold text-gray-800 truncate">{gig.title}</h2>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                                    {getSymbol(gig.currency)}{gig.budget}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {gig.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="text-xs text-gray-500">
                                    Posted by <span className="font-medium text-gray-700">{gig.ownerId?.name || "Unknown"}</span>
                                </div>
                                <Link
                                    to={`/gig/${gig._id}`}
                                    className="text-blue-600 font-semibold text-sm hover:underline"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    ))}

                    {gigs.length === 0 && !loading && (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No gigs found. Be the first to post one!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
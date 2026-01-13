import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import newRequest from "../../lib/api";

const MyBidsTab = ({ socket }) => {
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBids = useCallback(async () => {
        try {
            const res = await newRequest.get("/me/bids");
            setBids(res.data.bids);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchBids();
    }, [fetchBids]);

    useEffect(() => {
        if (!socket) return;

        const handleNotification = () => {
            fetchBids();
        };

        socket.on("notification", handleNotification);

        return () => {
            socket.off("notification", handleNotification);
        };
    }, [socket, fetchBids]);

    const handleDelete = async (e, gigId) => {
        e.preventDefault();
        e.stopPropagation();

        if (!window.confirm("Are you sure you want to withdraw this bid?")) return;

        try {
            await newRequest.delete(`/bids/${gigId}`);
            setBids((prev) => prev.filter((bid) => bid.gigId?._id !== gigId));
        } catch (err) {
            console.log(err);
            alert("Failed to delete bid.");
        }
    };

    if (loading) return <div className="text-sm text-gray-400">Loading...</div>;
    if (bids.length === 0) return <div className="text-sm text-gray-400 italic">No bids placed yet.</div>;

    return (
        <div className="flex flex-col gap-4">
            {bids.map((bid) => (
                <Link to={`/gig/${bid.gigId?._id}`} key={bid._id} className="group relative block">
                    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/60 shadow-sm hover:shadow-md transition-all duration-300 group-hover:bg-white/80">

                        <div className="flex justify-between items-start">
                            <div className="pr-8">
                                <h3 className="font-semibold text-gray-900 group-hover:text-black">
                                    {bid.gigId?.title || "Unknown Gig"}
                                </h3>
                                <p className="text-gray-500 text-xs mt-1 font-light">
                                    Offer: <span className="italic">"{bid.message}"</span>
                                </p>
                            </div>

                            <div className="text-right flex flex-col items-end gap-2 mr-7">
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${bid.status === "hired"
                                        ? "bg-green-50/50 text-green-700 border-green-100"
                                        : bid.status === "rejected"
                                            ? "bg-red-50/50 text-red-700 border-red-100"
                                            : "bg-yellow-50/50 text-yellow-700 border-yellow-100"
                                        }`}
                                >
                                    {bid.status}
                                </span>
                                <div className="font-medium text-gray-800 text-sm">
                                    {bid.gigId?.currency} {bid.price}
                                </div>
                            </div>
                        </div>

                        {bid.status === "hired" && (
                            <div className="mt-4 pt-3 border-t border-gray-200/50 flex flex-wrap items-center gap-x-6 gap-y-2 animate-in fade-in duration-500">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                                        Employer
                                    </span>
                                    <span className="text-xs font-semibold text-gray-900">
                                        {bid.gigId?.ownerId?.name || "Unknown"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                                        Contact
                                    </span>
                                    <span className="text-xs font-mono text-gray-700 bg-gray-100/50 px-2 py-0.5 rounded">
                                        Contact: {bid.gigId?.ownerId?.contactNumber || "N/A"}
                                    </span>
                                </div>
                            </div>
                        )}

                    </div>
                    {bid.status !== "hired" && (
                        <button
                            onClick={(e) => handleDelete(e, bid.gigId?._id)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                            title="Withdraw Bid"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                        </button>
                    )}
                </Link>
            ))}
        </div>
    );
};

export default MyBidsTab;
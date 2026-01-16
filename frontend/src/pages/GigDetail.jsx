import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import newRequest from "../lib/api";
import { AuthContext } from "../context/AuthContext";

import HireModal from "../components/gig/HireModal";
import GigInfo from "../components/gig/GigInfo";
import BidList from "../components/gig/BidList";
import BidForm from "../components/gig/BidForm";

const GigDetail = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);

    const [gig, setGig] = useState(null);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bidError, setBidError] = useState(null);
    const [confirmBid, setConfirmBid] = useState(null);
    const [copiedField, setCopiedField] = useState(null); // For copy feedback

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGig = async () => {
            try {
                const res = await newRequest.get(`/gigs/${id}`);
                setGig(res.data);
                if (currentUser && res.data.ownerId?._id === currentUser._id) {
                    fetchBids();
                }
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
        fetchGig();
    }, [id, currentUser]);

    const fetchBids = async () => {
        try {
            const res = await newRequest.get(`/bids/${id}`);
            setBids(res.data.bids);
        } catch (err) {
            console.log(err);
        }
    };

    const handleBidSubmit = async (data) => {
        setBidError(null);
        try {
            await newRequest.post(`/bids/${id}`, {
                gigId: id,
                message: data.message,
                price: data.price,
            });
            alert("Bid placed successfully!");
            navigate("/dashboard");
            window.location.reload();
        } catch (err) {
            setBidError(err.response?.data?.message || "Failed to place bid");
        }
    };

    const confirmHire = async () => {
        if (!confirmBid) return;
        try {
            await newRequest.patch(`/bids/${confirmBid._id}/hire`);
            setConfirmBid(null);
            window.location.reload();
        } catch (err) {
            alert(err.response?.data?.message || "Hiring failed");
        }
    };

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    if (loading)
        return (
            <div className="flex justify-center mt-20 text-gray-400 text-sm">
                Loading details...
            </div>
        );
    if (!gig)
        return <div className="text-center mt-20 text-gray-500">Gig not found</div>;

    const isOwner = currentUser?._id === gig.ownerId._id;
    const currencySymbol = gig.currency === "INR" ? "₹" : "$";

    return (
        <div className="min-h-screen bg-gray-50/50 py-10">
            <div className="max-w-6xl mx-auto px-6 relative">
                {/* Modal */}
                <HireModal
                    bid={confirmBid}
                    currencySymbol={currencySymbol}
                    onClose={() => setConfirmBid(null)}
                    onConfirm={confirmHire}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content (Left) */}
                    <div className="lg:col-span-2">
                        <GigInfo gig={gig} currencySymbol={currencySymbol} />

                        {isOwner && (
                            <BidList
                                bids={bids}
                                currencySymbol={currencySymbol}
                                onHireClick={setConfirmBid}
                                gigStatus={gig.status}
                            />
                        )}
                    </div>

                    {/* Sidebar (Right) */}
                    <div className="lg:col-span-1">

                        {/* 1. Bid Form (If Logged In) */}
                        {!isOwner && currentUser && gig.status === "open" && (
                            <BidForm
                                onSubmit={handleBidSubmit}
                                currencySymbol={currencySymbol}
                                error={bidError}
                            />
                        )}

                        {/* 2. Login Prompt (If Logged Out) */}
                        {!isOwner && !currentUser && gig.status === "open" && (
                            <div className="sticky top-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect
                                                width="18"
                                                height="11"
                                                x="3"
                                                y="11"
                                                rx="2"
                                                ry="2"
                                            />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-800">
                                        Login Required
                                    </h3>
                                </div>

                                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                    To place a bid on this Gig, you must be logged in. You can use
                                    the testing credentials below.
                                </p>

                                <div className="bg-gray-50 rounded-lg border border-gray-100 p-4 space-y-3 mb-6">
                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                        Testing Account
                                    </div>

                                    {/* Email Row */}
                                    <div className="flex items-center justify-between group">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-400">Email</span>
                                            <code className="text-sm font-mono text-gray-700">
                                                gigtester@test.com
                                            </code>
                                        </div>
                                        <button
                                            onClick={() => handleCopy("gigtester@test.com", "email")}
                                            className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                                            title="Copy Email"
                                        >
                                            {copiedField === "email" ? (
                                                <span className="text-xs text-green-600 font-medium">
                                                    Copied!
                                                </span>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <rect
                                                        width="14"
                                                        height="14"
                                                        x="8"
                                                        y="8"
                                                        rx="2"
                                                        ry="2"
                                                    />
                                                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>

                                    {/* Password Row */}
                                    <div className="flex items-center justify-between group border-t border-gray-200 pt-2">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-400">
                                                Password
                                            </span>
                                            <code className="text-sm font-mono text-gray-700">
                                                testpass
                                            </code>
                                        </div>
                                        <button
                                            onClick={() => handleCopy("testpass", "pass")}
                                            className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                                            title="Copy Password"
                                        >
                                            {copiedField === "pass" ? (
                                                <span className="text-xs text-green-600 font-medium">
                                                    Copied!
                                                </span>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <rect
                                                        width="14"
                                                        height="14"
                                                        x="8"
                                                        y="8"
                                                        rx="2"
                                                        ry="2"
                                                    />
                                                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <Link
                                    to="/login"
                                    className="block w-full text-center bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Log In to Bid
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GigDetail;
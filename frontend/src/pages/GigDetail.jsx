import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import newRequest from "../lib/api";
import { AuthContext } from "../context/AuthContext";

const GigDetail = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [gig, setGig] = useState(null);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

    const [bidMessage, setBidMessage] = useState("");
    const [bidPrice, setBidPrice] = useState("");
    const [bidError, setBidError] = useState(null);

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

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        setBidError(null);
        try {
            await newRequest.post(`/bids/${id}`, {
                message: bidMessage,
                price: bidPrice
            });
            alert("Bid placed successfully!");
            setBidMessage("");
            setBidPrice("");
        } catch (err) {
            setBidError(err.response?.data?.message || "Failed to place bid");
        }
    };

    const handleHire = async (bidId) => {
        try {
            await newRequest.patch(`/bids/${bidId}/hire`);
            window.location.reload();
        } catch (err) {
            alert(err.response?.data?.message || "Hiring failed");
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!gig) return <div className="text-center mt-10">Gig not found</div>;

    const isOwner = currentUser?._id === gig.ownerId._id;

    // Helper for Symbol
    const currencySymbol = gig.currency === "INR" ? "₹" : "$";

    return (
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="md:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">{gig.title}</h1>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${gig.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                            }`}>
                            {gig.status}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b pb-6">
                        <span>Posted by: <span className="font-medium text-gray-800">{gig.ownerId.name}</span></span>
                        <span>•</span>
                        <span>Budget: <span className="font-medium text-green-600 text-lg">{currencySymbol}{gig.budget}</span></span>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {gig.description}
                    </p>
                </div>

                {isOwner && (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold mb-4">Received Bids ({bids.length})</h2>
                        <div className="space-y-4">
                            {bids.length === 0 && <p className="text-gray-500">No bids yet.</p>}

                            {bids.map((bid) => (
                                <div key={bid._id} className="p-4 border rounded-md flex justify-between items-center bg-gray-50">
                                    <div>
                                        <div className="font-semibold text-gray-800">
                                            {bid.freelancerId.name}
                                            <span className="text-green-600 ml-2">{currencySymbol}{bid.price}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mt-1">{bid.message}</p>
                                        <div className="text-xs text-gray-500 mt-2 uppercase font-bold tracking-wide">
                                            Status: <span className={
                                                bid.status === 'hired' ? 'text-green-600' :
                                                    bid.status === 'rejected' ? 'text-red-500' : 'text-yellow-600'
                                            }>{bid.status}</span>
                                        </div>
                                    </div>

                                    {gig.status === 'open' && (
                                        <button
                                            onClick={() => handleHire(bid._id)}
                                            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
                                        >
                                            Hire
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="md:col-span-1">
                {!isOwner && currentUser && gig.status === 'open' && (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Place a Bid</h3>
                        <form onSubmit={handleBidSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Your Price ({currencySymbol})</label>
                                <input
                                    type="number"
                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                                    value={bidPrice}
                                    onChange={(e) => setBidPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Cover Letter</label>
                                <textarea
                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                                    rows="4"
                                    placeholder="Why are you a good fit?"
                                    value={bidMessage}
                                    onChange={(e) => setBidMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            {bidError && <p className="text-red-500 text-xs">{bidError}</p>}

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition">
                                Submit Proposal
                            </button>
                        </form>
                    </div>
                )}

                {gig.status === 'assigned' && !isOwner && (
                    <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 text-center">
                        <p className="text-gray-500 font-medium">This gig has been assigned.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default GigDetail;
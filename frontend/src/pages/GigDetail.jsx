import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
            // navigate('/dashboard')
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

    if (loading) return <div className="flex justify-center mt-20 text-gray-400 text-sm">Loading details...</div>;
    if (!gig) return <div className="text-center mt-20 text-gray-500">Gig not found</div>;

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

                    <div className="lg:col-span-1">
                        {!isOwner && currentUser && gig.status === "open" && (
                            <BidForm
                                onSubmit={handleBidSubmit}
                                currencySymbol={currencySymbol}
                                error={bidError}
                            />
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GigDetail;

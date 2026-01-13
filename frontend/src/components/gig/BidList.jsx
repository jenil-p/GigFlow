import React from "react";

const BidList = ({ bids, currencySymbol, onHireClick, gigStatus }) => {
    return (
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-white/60 shadow-sm mt-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Proposals ({bids.length})</h2>

            <div className="space-y-4">
                {bids.length === 0 && <p className="text-gray-400 italic text-sm">No proposals received yet.</p>}

                {bids.map((bid) => (
                    <div
                        key={bid._id}
                        className={`p-5 rounded-2xl border transition-all duration-300 ${bid.status === "hired"
                                ? "bg-green-50/40 border-green-100"
                                : "bg-white/40 border-white/60 hover:bg-white/80 hover:shadow-sm"
                            }`}
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-900 text-sm">{bid.freelancerId.name}</span>

                                    {bid.status === "hired" && (
                                        <span className="bg-green-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                                            Hired
                                        </span>
                                    )}
                                </div>

                                <div className="text-xs text-gray-500 font-mono mb-2 flex items-center gap-1">
                                    <span className="opacity-50">Contact: </span>
                                    {bid.freelancerId.contactNumber || "No contact info"}
                                </div>

                                <p className="text-gray-600 text-xs leading-relaxed font-light mt-1">
                                    "{bid.message}"
                                </p>
                            </div>

                            <div className="text-right shrink-0 flex flex-col items-end gap-2">
                                <div className="text-base font-bold text-gray-900">
                                    {currencySymbol}{bid.price}
                                </div>

                                {gigStatus === "open" && (
                                    <button
                                        onClick={() => onHireClick(bid)}
                                        className="px-4 py-1.5 bg-gray-900 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full hover:bg-black transition shadow-sm"
                                    >
                                        Hire
                                    </button>
                                )}

                                {gigStatus === "assigned" && bid.status !== "hired" && (
                                    <span className="text-gray-300 text-[10px] font-bold uppercase tracking-wider">Rejected</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BidList;
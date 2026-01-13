import React from "react";

const HireModal = ({ bid, currencySymbol, onClose, onConfirm }) => {
    if (!bid) return null;
    console.log(bid)
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 transition-all">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-white/50">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Hiring</h3>
                <p className="text-sm text-gray-500 mb-6 font-light">
                    Are you sure you want to hire this freelancer for the project?
                </p>

                <div className="bg-gray-50/80 rounded-xl p-4 mb-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Freelancer</span>
                        <span className="text-sm font-semibold text-gray-900">{bid.freelancerId.name}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Contact Number</span>
                        <span className="text-xs text-gray-900">+91 {bid.freelancerId.contactNumber}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-200/50 pt-2 mt-2">
                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Agreed Price</span>
                        <span className="text-base font-bold text-gray-900">{currencySymbol}{bid.price}</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-gray-200"
                    >
                        Confirm Hire
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HireModal;
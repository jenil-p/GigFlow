import React from "react";

const GigInfo = ({ gig, currencySymbol }) => {
    return (
        <div className="bg-white/70 backdrop-blur-md p-8 mb-10 rounded-2xl border border-white/60 shadow-sm">
            <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{gig.title}</h1>
                <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${gig.status === "open"
                            ? "bg-green-50/50 text-green-700 border-green-100"
                            : "bg-gray-100/50 text-gray-600 border-gray-200"
                        }`}
                >
                    {gig.status}
                </span>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500 mb-8 border-b border-gray-100/50 pb-8">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Posted By</span>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-600">
                            {gig.ownerId.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{gig.ownerId.name}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Budget</span>
                    <span className="font-bold text-gray-900 text-lg">
                        {currencySymbol}{gig.budget}
                    </span>
                </div>
            </div>

            <h3 className="text-xs font-bold text-gray-900 uppercase mb-3 tracking-wide">Project Brief</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap font-light text-sm">
                {gig.description}
            </p>
        </div>
    );
};

export default GigInfo;
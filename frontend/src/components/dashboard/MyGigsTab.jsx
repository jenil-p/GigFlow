import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newRequest from "../../lib/api";

const MyGigsTab = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                const res = await newRequest.get("/me/gigs");
                setGigs(res.data.gigs);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
        fetchGigs();
    }, []);

    const getSymbol = (currency) => (currency === "INR" ? "₹" : "$");

    if (loading) return <div className="text-sm text-gray-400">Loading...</div>;
    if (gigs.length === 0) return <div className="text-sm text-gray-400 italic">No gigs posted yet.</div>;

    return (
        <div className="flex flex-col gap-4">
            {gigs.map((gig) => (
                <Link to={`/gig/${gig._id}`} key={gig._id} className="group">
                    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/60 shadow-sm hover:shadow-md transition-all duration-300 flex justify-between items-center group-hover:bg-white/80">
                        <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors">{gig.title}</h3>
                            <p className="text-gray-500 text-xs mt-1 truncate max-w-md font-light">
                                {gig.description}
                            </p>
                        </div>

                        <div className="text-right flex flex-col items-end gap-2">
                            <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${gig.status === "open"
                                        ? "bg-green-50/50 text-green-700 border-green-100"
                                        : "bg-gray-100/50 text-gray-600 border-gray-200"
                                    }`}
                            >
                                {gig.status}
                            </span>
                            <div className="font-medium text-gray-800 text-sm">
                                {getSymbol(gig.currency)}{gig.budget}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default MyGigsTab;
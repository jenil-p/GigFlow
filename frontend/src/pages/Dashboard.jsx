import React, { useState } from "react";
import MyGigsTab from "../components/dashboard/MyGigsTab";
import MyBidsTab from "../components/dashboard/MyBidsTab";

import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("gigs");
    const { socket } = useOutletContext();

    return (
        <div className="min-h-screen bg-gray-50/50 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">

                <div className="md:col-span-3">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm sticky top-24 p-2">
                        <button
                            onClick={() => setActiveTab("gigs")}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "gigs"
                                    ? "bg-gray-900/5 text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
                                }`}
                        >
                            My Gigs
                        </button>
                        <button
                            onClick={() => setActiveTab("bids")}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all mt-1 ${activeTab === "bids"
                                    ? "bg-gray-900/5 text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
                                }`}
                        >
                            My Bids
                        </button>
                    </div>
                </div>

                <div className="md:col-span-9">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            {activeTab === "gigs" ? "Jobs You Posted" : "Jobs You Applied For"}
                        </h2>
                        <p className="text-gray-400 text-xs mt-1">Manage your ongoing activity</p>
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {activeTab === "gigs" ? <MyGigsTab /> : <MyBidsTab socket={socket} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
import BidModel from '../models/Bid.model.js';
import GigModel from '../models/Gig.model.js';
import mongoose from "mongoose";

export const createBid = async (req, res) => {
    try {
        const user = req.user;
        const { gigId } = req.params;
        const { message, price } = req.body;

        const gig = await GigModel.findById(gigId);
        if (gig.ownerId.toString() == user.id) {
            return res.status(403).json({ message: "you ca'nt bid on your own gig" });
        }

        const newBid = await BidModel.create({
            gigId: gigId,
            freelancerId: user.id,
            message: message,
            price: price,
            status: "pending"
        });

        return res.status(201).json({ newBid });
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
};

export const getBidsByGig = async (req, res) => {
    try {
        const user = req.user;
        const gigId = req.params.gigId;

        const gig = await GigModel.findById(gigId);

        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }

        if (gig.ownerId.toString() !== user.id) {
            return res.status(403).json({ message: "only owner can view the bids" });
        }

        const bids = await BidModel.find({ gigId: gigId })
            .populate("freelancerId", "name email");

        return res.status(200).json({ bids });
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
};

export const hireFreelancer = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = req.user;
        const bidId = req.params.bidId;

        const bidToHire = await BidModel.findById(bidId).session(session);
        if (!bidToHire) {
            return res.status(400).json({ message: "bid not found" })
        }

        const gig = await GigModel.findById(bidToHire.gigId).session(session);

        if (gig.status !== "open") {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "gig is already assigned" });
        }

        if (gig.ownerId.toString() !== user.id) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ message: "you are not the owner of this gig" });
        }

        gig.status = "assigned";
        await gig.save({ session });

        bidToHire.status = "hired";
        await bidToHire.save({ session });

        await BidModel.updateMany(
            { gigId: gig._id, _id: { $ne: bidId } },
            { $set: { status: "rejected" } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        //////////// those socker thing...
        const freelancerSocketId = req.onlineUsers.get(bidToHire.freelancerId.toString());
        if (freelancerSocketId) {
            req.io.to(freelancerSocketId).emit("notification", {
                type: "HIRED",
                message: `congrats... you are hired for the project: ${gig.title}`,
                gigId: gig._id,
            });
        }

        return res.status(200).json({ message: "freelancer hired successfully", hiredBid: bidToHire });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: "internal server error" });
    }
};
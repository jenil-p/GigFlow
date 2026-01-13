import UserModel from "../models/User.model.js";
import GigModel from "../models/Gig.model.js";
import BidModel from "../models/Bid.model.js";

export async function getMyGigs(req, res) {
  const user = req.user;

  try {
    const gigs = await GigModel.find({
      ownerId: user.id,
    })

    return res.status(200).json({ gigs });
    console.log("my gigs : ", gigs);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
}

export async function getMyBids(req, res) {
  const user = req.user;

  try {
    const bids = await BidModel.find({ freelancerId: user.id })
      .populate("freelancerId", "name email contactNumber")
      .populate({
        path: "gigId",
        select: "title status ownerId currency",
        populate: {
          path: "ownerId",
          select: "name email contactNumber"
        }
      });
      console.log("My bids: ", bids);
    return res.status(200).json({ bids });

  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
}
import GigModel from "../models/Gig.model.js";

export async function createGig(req, res) {
  try {

    const user = req.user;

    const { title, description, budget, currency } = req.body;

    const newGig = await GigModel.create({
      title: title,
      description: description,
      budget: budget,
      currency: currency,
      ownerId: user.id
    })

    return res.status(201).json({ newGig });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export async function getGigs(req, res) {
  const q = req.query;

  const filters = {
    status: "open", //  only 'open' gigs we are showing
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const gigs = await GigModel.find(filters).populate('ownerId', 'name email');
    res.status(200).json(gigs);
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export async function getGig(req, res) {
  try {
    const gig = await GigModel.findById(req.params.id).populate('ownerId', 'name email');
    if (!gig) return res.status(404).json({ message: "Gig not found!" });
    res.status(200).json(gig);
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};
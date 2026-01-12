import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true  },// index is for fast search
  description: { type: String, required: true, },
  budget: { type: Number, required: true, },
  currency: {type: String, enum: ["USD" , "INR"] , required: true, },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
  status: { type: String, enum: ['open', 'assigned'], default: 'open', }
}, { timestamps: true });

export default mongoose.model('Gig', gigSchema);
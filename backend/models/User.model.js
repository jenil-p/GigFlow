import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true,},
  email: { type: String, required: true, unique: true,},
  contactNumber: {type: Number, required: true, unique: true, min: 1000000000, numbermax: 9999999999},
  password: { type: String, required: true,},
}, { timestamps: true });

export default mongoose.model('User', userSchema);
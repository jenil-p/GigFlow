import express from 'express'
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// routers import
import authRoutes from './routes/auth.routes.js';
import gigsRoutes from './routes/gig.routes.js';
import bidsRouter from './routes/bid.routes.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.error('mongodb connection error:', err));


app.use('/api/auth', authRoutes);
app.use('/api/gigs' , gigsRoutes);
app.use('/api/bids' , bidsRouter);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
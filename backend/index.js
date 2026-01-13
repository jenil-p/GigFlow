import express from 'express'
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { createServer } from 'http';
import { Server } from 'socket.io';

// routers import
import authRoutes from './routes/auth.routes.js';
import gigsRoutes from './routes/gig.routes.js';
import bidsRouter from './routes/bid.routes.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("addNewUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("User connected:", userId);
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

app.use((req, res, next) => {
  req.io = io;
  req.onlineUsers = onlineUsers;
  next();
});


app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.error('mongodb connection error:', err));


app.use('/api/auth', authRoutes);
app.use('/api/gigs' , gigsRoutes);
app.use('/api/bids' , bidsRouter);


httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
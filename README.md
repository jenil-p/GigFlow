# GigFlow 🚀

GigFlow is a full-stack web application designed to connect users through gigs and bidding. It provides authentication, real-time interactions, and a smooth UI for managing gigs and bids.

🌐 **Live Demo:** [https://gigflow-nine.netlify.app/](https://gigflow-nine.netlify.app/)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React (Vite) / Next.js
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Real-time:** Socket.IO
- **Auth:** JWT Authentication

---

## 📂 Project Structure

```text
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
| 
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   ├── server.js
│   ├── package.json
│   └── .env.example
|
└── README.md

```
## 🔐 Environment Variables
This project uses environment variables for configuration. We have included .env.example files in the directories.

### Steps
- Create a **.env** file in both the frontend and backend directories.
- Copy contents from the respective **.env.example** files.
- Fill in your own credentials (DB URL, Secret Keys, etc.).

## Clone this repo in local and...

## Backend Setup
Open a terminal and navigate to the backend folder:

```text
cd backend
npm install
npm run dev
```
The Backend server will start on: http://localhost:5000 (or your configured port).

## Frontend Setup
Open a new terminal tab/window and navigate to the frontend folder:

```text
cd frontend
npm install
npm run dev
```
The Frontend will start on: http://localhost:5173 (default Vite port).

## Features
- User Authentication: Secure JWT-based login and signup.
- Gig Management: Create, update, and manage gigs seamlessly.
- Bidding System: Users can place bids on available gigs.
- Real-time Updates: Socket.IO integration for instant notifications/updates.
- Responsive UI: Optimized for both desktop and mobile devices.

## Scripts

### Frontend:
```text
npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview the production build
```

### Backend:
```text
npm run dev - Start development server (nodemon)
npm start - Start production server
```

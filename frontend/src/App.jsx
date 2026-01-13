import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateGig from "./pages/CreateGig";
import GigDetail from "./pages/GigDetail";
import Dashboard from "./pages/Dashboard";

import { AuthContext } from "./context/AuthContext";
import { useEffect, useContext, useState } from "react";
import { io } from "socket.io-client";

import { Toaster, toast } from "react-hot-toast";
import confetti from "canvas-confetti";

function App() {

  const Layout = () => {
    const { currentUser } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
      if (currentUser) {
        const newSocket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);
        setSocket(newSocket);

        newSocket.emit("addNewUser", currentUser._id);

        newSocket.on("notification", (data) => {

          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#22c55e', '#FFD700', '#3b82f6']
          });

          toast.custom((t) => (
            <div
              className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 border-green-500`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="shrink-0 pt-0.5">
                    {/* Trophy Icon */}
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-xl">🏆</span>
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-bold text-gray-900">You're Hired!</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {data.message || "A client just accepted your bid!"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none"
                >
                  Awesome!
                </button>
              </div>
            </div>
          ), { duration: 5000 });
        });

        return () => {
          newSocket.disconnect();
        };
      }
    }, [currentUser]);

    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Toaster position="top-center" reverseOrder={false} />

        <Navbar />
        <div className="max-w-6xl mx-auto p-4">
          <Outlet context={{ socket }} />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/add", element: <CreateGig /> },
        { path: "/gig/:id", element: <GigDetail /> },
        { path: "/dashboard", element: <Dashboard /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
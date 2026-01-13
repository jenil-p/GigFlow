import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import CreateGig from "./pages/CreateGig";
import GigDetail from "./pages/GigDetail";
// import MyGigs from "./pages/MyGigs";

import { AuthContext } from "./context/AuthContext";

import { useEffect, useContext } from "react";
import { io } from "socket.io-client";

function App() {

  const Layout = () => {
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
      if (currentUser) {
        const socket = io("http://localhost:5000");

        socket.emit("addNewUser", currentUser._id);

        socket.on("notification", (data) => {
          // TODO : replace this with a toast
          alert(data.message);
        });
        return () => {
          socket.disconnect();
        };
      }
    }, [currentUser]);
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Navbar />
        <div className="max-w-6xl mx-auto p-4">
          <Outlet />
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
        // { path: "/register", element: <Register /> },
        { path: "/add", element: <CreateGig /> },
        { path: "/gig/:id", element: <GigDetail /> },
        // { path: "/mygigs", element: <MyGigs /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
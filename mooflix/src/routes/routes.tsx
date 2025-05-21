import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import PrivateRoute from "../components/auth/PrivateRoute";
import { getHomeVideos } from "../services/appService";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "/home",
        loader: async () => {
          const res = await getHomeVideos();
          return res;
        },
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },
]);

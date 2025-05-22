import { createBrowserRouter, type LoaderFunctionArgs } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import PrivateRoute from "../components/auth/PrivateRoute";
import { getHomeVideos, getMovieDetails } from "../services/appService";
import EnterRecoveryCode from "../pages/EnterRecoveryCode";
import NewPassword from "../pages/NewPassword";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import MovieDetails from "../pages/MovieDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: <LoadingSkeleton />,
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
        HydrateFallback: LoadingSkeleton,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/enter-recovery-code", element: <EnterRecoveryCode /> },
      { path: "/new-password", element: <NewPassword /> },
      {
        path: "/movie/:movieId",
        element: <MovieDetails />,
        loader: getMovieDetails,
      },
    ],
  },
]);

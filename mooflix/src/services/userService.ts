import { AxiosError } from "axios";
import type { Movie } from "../types/Movie";
import axAPI from "../lib/axios";

export async function markMovieAsLiked(movieDetails: Movie): Promise<boolean> {
  try {
    // const token = sessionStorage.getItem("access_token");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const response = await axAPI.post(
      `${backendUrl}/likemovie/${movieDetails.imdbID}`,
      movieDetails
    );
    return true;
  } catch (error) {
    const axErr = error as AxiosError;
    if (axErr.status == 401) {
      //   sessionStorage.removeItem("access_token");
      //   window.location.href = "/login";
    }
    return false;
  }
}

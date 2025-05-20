import { useState, useEffect } from "react";
import { fetchMovies } from "../services/movieService";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  return { movies, loading };
};

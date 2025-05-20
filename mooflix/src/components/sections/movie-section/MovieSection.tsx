import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import type { Movie } from "../../../types/Movie";

type Props = {
  sectionTitle: string;
};

function MovieSection({ sectionTitle }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    console.log("fetching");
    async function getMovies() {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/movies`);

        console.log(response.data.Search);
        setMovies(response.data.Search);
      } catch {
        console.log("error");
      }
    }

    getMovies();
  }, []);
  return (
    <div className="my-12 m-6">
      <h2 className="text-3xl font-bold">{sectionTitle}</h2>
      <div className="my-4 grid grid-cols-4">
        {movies.map((movie: Movie) => (
          <MovieCard
            key={movie.imdbID}
            Poster={movie.Poster}
            Title={movie.Title}
            Type={movie.Type}
            Year={movie.Year}
            imdbID={movie.imdbID}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieSection;

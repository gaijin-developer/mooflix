import { useEffect, useState } from "react";

import axios from "axios";
import type { Movie } from "../../../types/Movie";
import LoadingSkeleton from "../../ui/LoadingSkeleton";
import MovieCard from "../../ui/MovieCard";

type Props = {
  sectionTitle: string;
};

function MovieSection({ sectionTitle }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    async function getMovies() {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/movies`);

        setMovies(response.data.Search);
      } catch {
        // console.log("error");
      }
    }

    getMovies();
  }, []);
  return (
    <div className="my-12 m-6">
      <h2 className="text-3xl font-bold">{sectionTitle}</h2>
      <div className="my-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-[1300px] m-auto pb-16">
        {movies.length < 1 && <LoadingSkeleton />}
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

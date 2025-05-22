import type { Movie } from "../../../types/Movie";

import MovieCard from "../../ui/MovieCard";

type Props = {
  sectionTitle: string;
  movies: Movie[];
};

function MovieSection({ sectionTitle, movies }: Props) {
  return (
    <div className="my-12 p-2 max-w-[1300px] m-auto">
      <h2 className="text-3xl font-bold">{sectionTitle}</h2>
      <div className="my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[1300px] m-auto pb-16">
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

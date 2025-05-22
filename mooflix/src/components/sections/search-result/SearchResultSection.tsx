import { useRef } from "react";
import type { Movie } from "../../../types/Movie";
import gsap from "gsap";
import MovieCard from "../../ui/MovieCard";

import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  sectionTitle: string;
  movies: Movie[];
};

function SearchResultSection({ sectionTitle, movies }: Props) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cardsWrapper",
        {
          y: 10,
          duration: 0.5,
          height: 0,
          ease: "power2.out",
        },
        {
          opacity: 1,
          height: "auto",
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [movies] }
  );

  return (
    <div className="my-12 m-6" ref={containerRef}>
      <h2 className="text-3xl font-bold">{sectionTitle}</h2>
      <div
        className="my-4 grid grid-cols-2 
      md:grid-cols-4 lg:grid-cols-5 
      gap-4 max-w-[1300px] 
      m-auto pb-16 cardsWrapper"
      >
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

export default SearchResultSection;

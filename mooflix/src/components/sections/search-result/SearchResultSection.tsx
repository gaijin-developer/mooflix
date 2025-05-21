import { useEffect, useRef } from "react";
import type { Movie } from "../../../types/Movie";
import gsap from "gsap";
import LoadingSkeleton from "../../ui/LoadingSkeleton";
import MovieCard from "../../ui/MovieCard";

import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  sectionTitle: string;
  movies: Movie[];
};

function SearchResultSection({ sectionTitle, movies }: Props) {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      containerRef.current!.style.visibility = "visible";
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [movies] }
  );

  return (
    <div
      className="my-12 m-6"
      ref={containerRef}
      style={{ visibility: "hidden" }}
    >
      <h2 className="text-3xl font-bold">{sectionTitle}</h2>
      <div
        className="my-4 grid grid-cols-2 
      md:grid-cols-4 lg:grid-cols-5 
      gap-4 max-w-[1300px] 
      m-auto pb-16 "
      >
        {movies.map((movie: Movie, i) => (
          <div
            key={movie.imdbID}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
          >
            <MovieCard
              Poster={movie.Poster}
              Title={movie.Title}
              Type={movie.Type}
              Year={movie.Year}
              imdbID={movie.imdbID}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultSection;

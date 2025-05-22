import { useLoaderData, useSearchParams } from "react-router";
import MovieSection from "../components/sections/movie-section/MovieSection";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { getSearchResults } from "../services/appService";
import type { Movie } from "../types/Movie";
import SearchResultSection from "../components/sections/search-result/SearchResultSection";
import { useStore } from "../store/store";

function Home() {
  const [searchText, setSearchText] = useState<string | null>(null);

  const searchResultsBox = useRef<HTMLDivElement>(null);

  const sMovies = useStore((state) => state.searchedMovies);

  const setSearchedMovies = useStore((state) => state.setSearchedMovies);

  const homeMovies = useLoaderData();

  const params = useSearchParams()[0];

  useLayoutEffect(() => {
    const s = params.get("s");
    if (s) {
      if (searchResultsBox.current && sMovies.length > 0) {
        const srBox = searchResultsBox.current as HTMLDivElement;

        srBox.style.minHeight = "700px";
      }
    }
  }, []);

  useEffect(() => {
    const s = params.get("s");
    if (s) {
      setSearchText(s);
      const getSearchedMovie = async () => {
        const response: Movie[] = await getSearchResults(s);
        setSearchedMovies(response);
      };

      getSearchedMovie();
    }
  }, [params, setSearchedMovies]);
  return (
    <div>
      <div ref={searchResultsBox}>
        {searchText && sMovies && (
          <SearchResultSection
            sectionTitle={`Search Results for ${searchText}`}
            movies={sMovies}
          />
        )}
      </div>

      <MovieSection sectionTitle="Latest" movies={homeMovies || []} />
    </div>
  );
}

export default Home;

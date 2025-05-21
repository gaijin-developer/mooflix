import { useLoaderData, useSearchParams } from "react-router";
import HeroSlides from "../components/sections/hero-slides/HeroSlides";
import MovieSection from "../components/sections/movie-section/MovieSection";
import { useEffect, useState } from "react";

import { getSearchResults } from "../services/appService";
import type { Movie } from "../types/Movie";
import SearchResultSection from "../components/sections/search-result/SearchResultSection";

function Home() {
  const [searchText, setSearchText] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<Movie[]>([]);

  const homeMovies = useLoaderData();

  const params = useSearchParams()[0];

  useEffect(() => {
    const s = params.get("s");
    if (s) {
      setSearchText(s);

      const getSearchedMovie = async () => {
        const response: Movie[] = await getSearchResults(s);
        setSearchResult(response);
      };

      getSearchedMovie();
    }
  }, [params]);
  return (
    <div>
      <HeroSlides />
      {searchText && searchResult && (
        <SearchResultSection
          sectionTitle={`Search Results for ${searchText}`}
          movies={searchResult}
        />
      )}
      <MovieSection sectionTitle="Latest" movies={homeMovies || []} />
    </div>
  );
}

export default Home;

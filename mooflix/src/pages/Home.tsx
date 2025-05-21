import { useSearchParams } from "react-router";
import HeroSlides from "../components/sections/hero-slides/HeroSlides";
import MovieSection from "../components/sections/movie-section/MovieSection";
import { Suspense, useEffect, useState } from "react";
import Loading from "../components/ui/LoadingSpinner";

function Home() {
  const [searchText, setSearchText] = useState<string | null>(null);
  const params = useSearchParams()[0];

  useEffect(() => {
    const s = params.get("s");
    if (s) {
      setSearchText(s);
    }
  }, [params]);
  return (
    <div>
      <HeroSlides />
      {searchText && (
        <Suspense>
          <MovieSection sectionTitle={`Search Results for ${searchText}`} />
        </Suspense>
      )}

      <MovieSection sectionTitle="Latest" />
    </div>
  );
}

export default Home;

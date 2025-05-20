import HeroSlides from "../components/sections/hero-slides/HeroSlides";
import MovieSection from "../components/sections/movie-section/MovieSection";

function Home() {
  return (
    <div>
      <HeroSlides />
      <MovieSection sectionTitle="Trending" />
    </div>
  );
}

export default Home;

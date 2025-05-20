// import { heroSectionImages } from "../../../data/heroSectionImages";
import classes from "./heroSlides.module.css";

function HeroSlides() {
  return (
    <div
      className={`border inset-shadow-[1px_-20px_20px] inset-shadow-indigo-500  w-[900px] ${classes.heroSlider}`}
    >
      {/* {heroSectionImages.map((image: string) => (
        <HeroSlide image={image} key={image} />
      ))} */}
    </div>
  );
}

export default HeroSlides;

type HeroSlideProps = {
  image: string;
};

function HeroSlide({ image }: HeroSlideProps) {
  return (
    <div className="-z-10">
      <img src={image} alt="" className="brightness-50" />
    </div>
  );
}

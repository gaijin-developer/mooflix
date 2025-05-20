import React from "react";
import type { Movie } from "../../../types/Movie";

function MovieCard({ Poster, Title, Type, Year }: Movie) {
  return (
    <div className="">
      <div className="">
        <img src={Poster} />
      </div>
    </div>
  );
}

export default MovieCard;

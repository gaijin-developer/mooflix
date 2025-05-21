import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import type { Movie } from "../../types/Movie";
import { Heart } from "lucide-react";
import { markMovieAsLiked } from "../../services/userService";
import { useEffect, useState } from "react";

function MovieCard({ Poster, Title, Type, Year, imdbID }: Movie) {
  const [isLiked, setIsLiked] = useState(false);
  const existingLikes: string | null = localStorage.getItem("likes");

  const likeMovie = async () => {
    if (existingLikes != null) {
      const existingLikesArray: string[] = JSON.parse(existingLikes);

      if (existingLikesArray.includes(imdbID)) {
        const updatedLikes = existingLikesArray.filter((str) => str != imdbID);
        localStorage.setItem("likes", JSON.stringify(updatedLikes));
        setIsLiked(false);
      } else {
        const updatedLikes = [...existingLikesArray, imdbID];
        localStorage.setItem("likes", JSON.stringify(updatedLikes));
        setIsLiked(true);
      }
    } else {
      localStorage.setItem("likes", JSON.stringify([imdbID]));
      setIsLiked((prevVal) => !prevVal);
    }
  };
  useEffect(() => {
    if (existingLikes != null) {
      const existingLikesArray: string[] = JSON.parse(existingLikes);
      if (existingLikesArray.includes(imdbID)) {
        setIsLiked(true);
      }
    }
  }, [existingLikes, imdbID]);

  return (
    <Card padding="" radius="md" maw={300} mah={500}>
      <Card.Section className="h-[100px]">
        <Image src={Poster} alt={Title} />
      </Card.Section>

      <Group className="">
        <Text fw={500} c="white">
          {Title}
        </Text>
        <Button onClick={likeMovie}>
          <Heart className="" fill={isLiked ? "red" : "none"} />
        </Button>
      </Group>
    </Card>
  );
}

export default MovieCard;

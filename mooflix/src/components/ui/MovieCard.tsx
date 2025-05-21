import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import type { Movie } from "../../types/Movie";
import { Heart } from "lucide-react";
import { markMovieAsLiked } from "../../services/userService";
import { useState } from "react";

function MovieCard({ Poster, Title, Type, Year, imdbID }: Movie) {
  const [isLiked, setIsLiked] = useState(false);
  const likeMovie = async () => {
    const response = await markMovieAsLiked({
      Poster,
      Title,
      Type,
      Year,
      imdbID,
    });
    if (response) {
      setIsLiked((prevVal) => !prevVal);
    }
  };
  return (
    <Card padding="" radius="md" maw={300} mah={400}>
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

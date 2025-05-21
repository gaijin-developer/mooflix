import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import type { Movie } from "../../types/Movie";
import { Heart } from "lucide-react";
import { markMovieAsLiked } from "../../services/userService";

function MovieCard({ Poster, Title, Type, Year, imdbID }: Movie) {
  const likeMovie = async () => {
    const response = await markMovieAsLiked({
      Poster,
      Title,
      Type,
      Year,
      imdbID,
    });

    if (response) {
      console.log("showingNotif");
    }
  };
  return (
    <Card padding="" radius="md" maw={300} mah={400}>
      <Card.Section className="h-[100px]">
        <Image src={Poster} alt={Title} />
      </Card.Section>

      <Group className="">
        <Text fw={500}>{Title}</Text>
        <Button onClick={likeMovie}>
          <Heart />
        </Button>
      </Group>
    </Card>
  );
}

export default MovieCard;

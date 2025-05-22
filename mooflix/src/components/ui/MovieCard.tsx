import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import type { Movie } from "../../types/Movie";
import { Heart } from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <Link to={`/movie/${imdbID}`}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ cursor: "pointer" }}
      >
        <Card.Section>
          <Image
            src={Poster !== "N/A" ? Poster : undefined}
            alt={Title}
            height={280}
            style={{ objectFit: "cover" }}
          />
        </Card.Section>

        <Group mt="md" mb="xs">
          <Text lineClamp={2} style={{ flex: 1 }}>
            {Title}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            {Year}
          </Text>
          <Badge
            color="blue"
            variant="light"
            size="sm"
            style={{ textTransform: "uppercase" }}
          >
            {Type}
          </Badge>
          <Button onClick={likeMovie} p={0} bg={"none"}>
            <Heart className="" fill={isLiked ? "red" : "none"} />
          </Button>
        </Group>
      </Card>
    </Link>
  );
}

export default MovieCard;

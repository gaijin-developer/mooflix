import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import type { Movie } from "../../types/Movie";
import { Heart } from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

function MovieCard({ Poster, Title, Type, Year, imdbID }: Movie) {
  const [isLiked, setIsLiked] = useState(false);
  const isPC = useMediaQuery("(min-width: 820px)");
  const [imageUrl, setImageUrl] = useState(Poster);

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
    <Card
      padding="none"
      radius="md"
      withBorder
      style={{ cursor: "pointer" }}
      h={"100%"}
    >
      <Link to={`/movie/${imdbID}`}>
        <section className="h-full">
          <Image
            src={
              imageUrl !== "N/A"
                ? imageUrl
                : "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            onError={() => {
              setImageUrl(
                "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              );
            }}
            alt={Title}
            height={280}
            style={{ objectFit: "cover" }}
            h={isPC ? 350 : 300}
          />
        </section>
      </Link>
      <section
        className="h-full p-2"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
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
      </section>
    </Card>
  );
}

export default MovieCard;

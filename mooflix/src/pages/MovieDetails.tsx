import { Badge, Card, CardSection, Group, Image, Text } from "@mantine/core";
import { useLoaderData } from "react-router";

function MovieDetails() {
  const movieDetails = useLoaderData();

  return (
    <Card maw={1100} m={"auto"} className="flex">
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="p-4">
          <div className="p-4">
            <CardSection>
              <Group justify="space-between">
                <Badge>{movieDetails.Year}</Badge>
                <Badge>{movieDetails.Type}</Badge>
              </Group>
            </CardSection>
          </div>

          <CardSection maw={400} mt={10} mb={15}>
            <Image
              src={
                movieDetails.Poster !== "N/A" ? movieDetails.Poster : undefined
              }
              alt={movieDetails.Title}
              height={280}
              style={{ objectFit: "cover" }}
            />
          </CardSection>
        </div>
        <div>
          <Group>
            <Text size="2rem" py={15}>
              {movieDetails.Title}
            </Text>
          </Group>
          <Group>
            <Badge>{movieDetails.Rated} </Badge>
            <Badge>{movieDetails.Released} </Badge>
            <Badge>Duration : {movieDetails.Runtime} </Badge>
          </Group>
          <Group mt={15}>
            <Badge>{movieDetails.Language} </Badge>
            <Badge>{movieDetails.Genre} </Badge>
            <Badge>Writer : {movieDetails.Writer} </Badge>
            <Badge>Actors : {movieDetails.Actors} </Badge>
          </Group>
          <Group mt={20}>
            <Text>{movieDetails.Plot} </Text>
            <Badge>Rating : {movieDetails.imdbRating} </Badge>
          </Group>
        </div>
      </div>
    </Card>
  );
}

export default MovieDetails;

import { Outlet, useParams } from "react-router-dom";
import { usePodcastQuery } from "../services/podcasts/podcast.hooks";
import { PodcastInfoCard } from "../components/podcast-info-card";

export function Podcast() {
  const { podcastId } = useParams<{ podcastId: string }>();

  const { data: podcast, isLoading } = usePodcastQuery(podcastId);

  if (!podcastId) {
    throw new Error(
      "No podcast ID provided, make sure the component is rendered inside a RouterProvider",
    );
  }

  if (isLoading) {
    return null;
  }

  if (!podcast) {
    return <h1>Podcast not found</h1>;
  }

  return (
    <div className={"flex gap-10"}>
      <PodcastInfoCard
        author={podcast.author}
        title={podcast.title}
        description={podcast.description}
        imageURL={podcast.images.large}
      />
      <Outlet />
    </div>
  );
}

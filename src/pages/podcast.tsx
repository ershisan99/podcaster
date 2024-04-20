import { Outlet, useParams } from "react-router-dom";
import {
  usePodcastEpisodesQuery,
  useTopPodcastsQuery,
} from "../services/podcasts/podcast.hooks";
import { PodcastInfoCard } from "../components/podcast-info-card";

export function Podcast() {
  const { podcastId } = useParams<{ podcastId: string }>();

  const { data: podcasts } = useTopPodcastsQuery();
  const { data: episodesData } = usePodcastEpisodesQuery(podcastId);

  if (!podcastId) {
    throw new Error(
      "No podcast ID provided, make sure the component is rendered inside a RouterProvider",
    );
  }

  if (!podcasts) {
    return null;
  }

  const podcast = podcasts.find((podcast) => podcast.id === podcastId);

  if (!podcast) {
    return <h1>Podcast not found</h1>;
  }

  return (
    <div>
      <PodcastInfoCard
        author={podcast.author}
        title={podcast.title}
        description={podcast.description}
        imageURL={episodesData?.podcast.images.large ?? ""}
      />
      <Outlet />
    </div>
  );
}

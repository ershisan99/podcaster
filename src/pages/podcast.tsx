import { useParams } from "react-router-dom";
import { useTopPodcastsQuery } from "../services/podcasts/podcast.hooks";

export function Podcast() {
  const { podcastId } = useParams<{ podcastId: string }>();

  const { data: podcasts } = useTopPodcastsQuery();

  if (!podcastId) {
    throw new Error(
      "No podcast ID provided, make sure the component is rendered inside a RouterProvider",
    );
  }

  if (!podcasts) {
    return null;
  }

  const podcast = podcasts.find((podcast) => podcast.id === podcastId);
  console.log(podcast);
  return <h1>Podcast page</h1>;
}

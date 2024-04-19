import { Link, useParams } from "react-router-dom";
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
  // TODO: break into smaller components
  return (
    <div>
      <PodcastInfoCard
        author={podcast.author}
        title={podcast.title}
        description={podcast.description}
        imageURL={episodesData?.podcast.images.large ?? ""}
      />
      <div>Episodes: {episodesData?.podcast.trackCount}</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Release Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodesData?.episodes?.map((episode) => {
              const formattedDate = formatDate(episode.releaseDate);
              const formattedDuration = formatDuration(episode.durationSeconds);
              const url = `/podcast/${podcastId}/episode/${episode.id}`;

              return (
                <tr key={episode.id}>
                  <td>
                    <Link to={url}>{episode.title}</Link>
                  </td>
                  <td>{formattedDate}</td>
                  <td>{formattedDuration}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatDuration(duration?: number) {
  if (!duration) {
    return "N/A";
  }
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

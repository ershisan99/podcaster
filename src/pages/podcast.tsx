import { Link, useParams } from "react-router-dom";
import {
  usePodcastEpisodesQuery,
  useTopPodcastsQuery,
} from "../services/podcasts/podcast.hooks";

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
      <div>
        <h1>{podcast.title}</h1>
        <h2>{podcast.author}</h2>
        <img src={episodesData?.podcast?.images.large} alt={podcast.title} />
        <p>{podcast.description}</p>
      </div>
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

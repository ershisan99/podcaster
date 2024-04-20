import { Link, useParams } from "react-router-dom";
import { usePodcastQuery } from "../services/podcasts/podcast.hooks";

export function PodcastEpisodesList() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { data: podcast } = usePodcastQuery(podcastId);

  return (
    <div>
      <div>Episodes: {podcast?.trackCount}</div>
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
            {podcast?.episodes?.map((episode) => {
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

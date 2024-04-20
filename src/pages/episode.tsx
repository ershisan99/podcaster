import { useParams } from "react-router-dom";
import { usePodcastEpisodesQuery } from "../services/podcasts/podcast.hooks";

export function Episode() {
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();

  const { data: episodesData } = usePodcastEpisodesQuery(podcastId);

  const episode = episodesData?.episodes.find(
    (episode) => episode.id.toString() === episodeId,
  );

  return (
    <div>
      <div>{episode?.description}</div>
      <div>
        <audio controls src={episode?.audioUrl}>
          Audio is not supported by your browser
        </audio>
      </div>
    </div>
  );
}

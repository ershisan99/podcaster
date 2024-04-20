import { useParams } from "react-router-dom";
import { usePodcastQuery } from "../services/podcasts/podcast.hooks";

export function Episode() {
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();

  const { data: episodesData } = usePodcastQuery(podcastId);

  const episode = episodesData?.episodes.find(
    (episode) => episode.id.toString() === episodeId,
  );

  return (
    <div>
      <div
        className={"prose"}
        dangerouslySetInnerHTML={{ __html: episode?.description ?? "" }}
      ></div>
      <div>
        <audio controls src={episode?.audioUrl}>
          Audio is not supported by your browser
        </audio>
      </div>
    </div>
  );
}

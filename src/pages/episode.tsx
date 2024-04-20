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
    <div className={"h-fit p-4 pb-6 shadow-md"}>
      <h2 className={"text-2xl font-bold tracking-tight"}>{episode?.title}</h2>
      <div
        className={"prose mt-2 max-w-full border-b pb-4 leading-snug"}
        dangerouslySetInnerHTML={{ __html: episode?.description ?? "" }}
      />
      <div>
        <audio controls src={episode?.audioUrl} className={"mt-4 w-full"}>
          Audio is not supported by your browser
        </audio>
      </div>
    </div>
  );
}

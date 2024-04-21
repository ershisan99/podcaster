import { useParams } from "react-router-dom";
import { usePodcastQuery } from "../services/podcasts/podcast.hooks";
import { useTitle } from "../hooks/use-title";

export function Episode() {
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();

  const { data: episodesData } = usePodcastQuery(podcastId);

  const episode = episodesData?.episodes.find(
    (episode) => episode.id.toString() === episodeId,
  );

  useTitle(episode?.title ?? "Episode");

  return (
    <section className={"h-fit w-full p-4 pb-6 shadow-md"}>
      <header className={"text-2xl font-bold tracking-tight"}>
        {episode?.title}
      </header>
      <article
        className={"prose mt-2 max-w-full border-b pb-4 leading-snug"}
        dangerouslySetInnerHTML={{ __html: episode?.description ?? "" }}
      />
      <audio controls src={episode?.audioUrl} className={"mt-4 w-full"}>
        Audio is not supported by your browser
      </audio>
    </section>
  );
}

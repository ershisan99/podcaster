import { useParams } from "react-router-dom";
import { usePodcastQuery } from "../../services/podcasts/podcast.hooks";
import { useTitle } from "../../hooks/use-title";
import { PodcastEpisodesTable } from "./podcast-episodes-table";

export function PodcastEpisodesList() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { data: podcast } = usePodcastQuery(podcastId);

  useTitle(podcast?.title ?? "Podcast");

  return (
    <section>
      <header className={"p-3 text-xl font-bold shadow-md"}>
        Episodes: {podcast?.trackCount}
      </header>
      <article className={"mt-6 p-3 shadow-md"}>
        <PodcastEpisodesTable episodes={podcast?.episodes} />
      </article>
    </section>
  );
}

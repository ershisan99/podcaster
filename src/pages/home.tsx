import { PodcastPreviewCard } from "../components/podcast-preview-card";
import { podcastsService } from "../services/podcasts/podcasts.service";
import { useQuery } from "../hooks/useQuery";

export function Home() {
  const { data } = useQuery(() => podcastsService.getTopPodcasts());

  return (
    <main>
      <div className={"grid grid-cols-4"}>
        {data?.map((podcast) => (
          <PodcastPreviewCard
            key={podcast.id}
            title={podcast.title}
            author={podcast.author}
            imageUrl={podcast.imageUrl}
          />
        ))}
      </div>
    </main>
  );
}

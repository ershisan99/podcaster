import { PodcastPreviewCard } from "../components/podcast-preview-card";
import { useState } from "react";
import { useTopPodcastsQuery } from "../services/podcasts/podcast.hooks";

export function Home() {
  const { data, isLoading } = useTopPodcastsQuery();
  const [search, setSearch] = useState("");

  const filteredData = data?.filter((podcast) => {
    return (
      podcast.title.toLowerCase().includes(search.toLowerCase()) ||
      podcast.author.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (isLoading) {
    return null;
  }

  return (
    <main>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <div className={"grid grid-cols-4"}>
        {filteredData?.map((podcast) => (
          <PodcastPreviewCard
            detailUrl={`/podcast/${podcast.id}`}
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

import { useState } from "react";

import { PodcastPreviewCard } from "../components/podcast-preview-card";
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
    <div>
      <div className={"mb-6 flex items-center justify-end gap-3"}>
        <span
          className={
            "flex items-center rounded-xl bg-sky-800 px-2 py-1.5 font-bold leading-none text-white"
          }
        >
          {filteredData?.length}
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter podcasts..."
          className={"w-1/3 rounded-md border border-gray-300 p-2"}
        />
      </div>
      <div className={"grid grid-cols-4 gap-x-6 gap-y-14"}>
        {filteredData?.map((podcast) => (
          <PodcastPreviewCard
            detailUrl={`/podcast/${podcast.id}`}
            key={podcast.id}
            title={podcast.title}
            author={podcast.author}
            imageUrl={podcast.images.large}
          />
        ))}
      </div>
    </div>
  );
}

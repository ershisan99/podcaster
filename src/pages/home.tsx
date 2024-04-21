import { useState } from "react";

import { PodcastPreviewCard, Input } from "../components";
import { useTopPodcastsQuery } from "../services";

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
        <Input
          className={"w-1/3"}
          value={search}
          onValueChange={setSearch}
          placeholder="Filter podcasts..."
        />
      </div>
      <section role={"list"} className={"grid grid-cols-4 gap-x-6 gap-y-24"}>
        {filteredData?.map((podcast) => (
          <PodcastPreviewCard
            detailUrl={`/podcast/${podcast.id}`}
            key={podcast.id}
            title={podcast.title}
            author={podcast.author}
            imageUrl={podcast.images.large}
          />
        ))}
      </section>
    </div>
  );
}

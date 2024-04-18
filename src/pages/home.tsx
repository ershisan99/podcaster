import { PodcastPreviewCard } from "../components/podcast-preview-card";

export function Home() {
  return (
    <main>
      <div className={"grid grid-cols-4"}>
        {podcasts.map((podcast) => (
          <PodcastPreviewCard
            title={podcast.title}
            author={podcast.author}
            imageUrl={podcast.imageSrc}
          />
        ))}
      </div>
    </main>
  );
}

const podcasts = [
  {
    imageSrc: "https://picsum.photos/200/200",
    title: "Podcast 1",
    author: "Author 1",
  },
  {
    imageSrc: "https://picsum.photos/200/200",
    title: "Podcast 2",
    author: "Author 2",
  },
];

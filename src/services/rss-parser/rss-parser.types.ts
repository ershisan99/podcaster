export interface RssEpisode {
  id: string;
  releaseDate: string;
  audioUrl: string;
  title: string;
  durationSeconds: number;
  description: string;
}

export interface RssPodcast {
  description: string;
  episodes: RssEpisode[];
}

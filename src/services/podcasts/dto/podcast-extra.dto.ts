import { PodcastDetails } from "../podcasts.types";

export class PodcastExtraDTO {
  id: number;
  trackCount: number;
  images: { small: string; medium: string; large: string };
  author: string;
  title: string;

  constructor(data: PodcastDetails) {
    this.id = data.trackId;
    this.author = data.artistName;
    this.title = data.collectionName;
    this.trackCount = data.trackCount;
    this.images = {
      small: data.artworkUrl60,
      medium: data.artworkUrl100,
      large: data.artworkUrl600,
    };
  }
}

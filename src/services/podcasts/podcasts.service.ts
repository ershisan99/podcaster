import { TopPodcastsResponse } from "./podcasts.types";
import { PodcastDTO } from "./podcast.dto";

class PodcastsService {
  baseUrl = "https://itunes.apple.com";

  async getTopPodcasts(): Promise<PodcastDTO[]> {
    const response = await fetch(
      `${this.baseUrl}/us/rss/toppodcasts/limit=100/genre=1310/json`,
    );
    const data: TopPodcastsResponse = await response.json();

    return data.feed.entry.map((podcast) => new PodcastDTO(podcast));
  }
}

export const podcastsService = new PodcastsService();

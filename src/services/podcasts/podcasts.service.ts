import { GetEpisodesResponse, GetTopPodcastsResponse } from "./podcasts.types";
import { PodcastDTO } from "./podcast.dto";

class PodcastsService {
  baseUrl = "https://itunes.apple.com";

  async getTopPodcasts(): Promise<PodcastDTO[]> {
    const response = await fetch(
      `${this.baseUrl}/us/rss/toppodcasts/limit=100/genre=1310/json`,
    );
    const data: GetTopPodcastsResponse = await response.json();

    return data.feed.entry.map((podcast) => new PodcastDTO(podcast));
  }

  async getEpisodesByPodcastId(podcastId: string) {
    const url = new URL(`${this.baseUrl}/lookup`);
    const params = {
      id: podcastId,
      media: "podcast",
      entity: "podcastEpisode",
      limit: "20",
    };
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);
    const data: GetEpisodesResponse = await response.json();

    //TODO: add dto
    return data;
  }
}

export const podcastsService = new PodcastsService();

import { GetEpisodesResponse, GetTopPodcastsResponse } from "./podcasts.types";
import { PodcastDTO } from "./dto/podcast.dto";
import { EpisodeDto } from "./dto/episode.dto";
import { PodcastExtraDTO } from "./dto/podcast-extra.dto";

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

    const response: GetEpisodesResponse = await this.fetchWithoutCors(
      url.toString(),
    );
    let podcast: PodcastExtraDTO = {} as PodcastExtraDTO;
    const episodes: EpisodeDto[] = [];

    response.results.forEach((entry) => {
      if (entry.kind === "podcast-episode") {
        episodes.push(new EpisodeDto(entry));
      } else if (entry.kind === "podcast") {
        podcast = new PodcastExtraDTO(entry);
      }
    });

    return { episodes, podcast: podcast };
  }

  //TODO: move into a separate service
  private async fetchWithoutCors(url: string) {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    );
    const data = await response.json();
    return JSON.parse(data.contents);
  }
}

export const podcastsService = new PodcastsService();

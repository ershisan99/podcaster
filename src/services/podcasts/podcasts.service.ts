import { GetEpisodesResponse, GetTopPodcastsResponse } from "./podcasts.types";
import { PodcastDTO } from "./dto/podcast.dto";
import { RssParser } from "../rss-parser";
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

  async getPodcastById(podcastId: string) {
    try {
      const url = new URL(`${this.baseUrl}/lookup`);
      const params = {
        id: podcastId,
        media: "podcast",
        entity: "podcast",
        limit: "1",
      };

      url.search = new URLSearchParams(params).toString();

      const response: GetEpisodesResponse = await this.fetchWithoutCors(
        url.toString(),
      );
      const podcastExtra = new PodcastExtraDTO(response.results[0]);
      const podcastFromFeed = await this.getPodcastFeed(
        response.results[0].feedUrl,
      );
      return { ...podcastExtra, ...podcastFromFeed };
    } catch (error) {
      console.error("Error fetching podcast data:", error);
      throw error;
    }
  }

  async getPodcastFeed(sourceURL: string) {
    try {
      // todo: only use allorigins after getting a cors error
      // const response = await fetch(
      //   `https://api.allorigins.win/raw?url=${encodeURIComponent(sourceURL)}`,
      // );
      const response = await fetch(sourceURL);
      const rss = await response.text();

      return RssParser.parse(rss);
    } catch (error) {
      console.error("Error fetching and parsing data:", error);
      throw error;
    }
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

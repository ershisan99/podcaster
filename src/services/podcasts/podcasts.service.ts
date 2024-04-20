import { GetEpisodesResponse, GetTopPodcastsResponse } from "./podcasts.types";
import { PodcastDTO } from "./dto/podcast.dto";
import { RssParser } from "../rss-parser";
import { PodcastExtraDTO } from "./dto/podcast-extra.dto";
import { bypassCorsService } from "../bypass-cors";

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

      const response = await bypassCorsService.fetchBypassingCors(
        url.toString(),
      );
      const json: GetEpisodesResponse = await response.json();
      const podcastExtra = new PodcastExtraDTO(json.results[0]);
      const podcastFromFeed = await this.getPodcastFeed(
        json.results[0].feedUrl,
      );
      return { ...podcastExtra, ...podcastFromFeed };
    } catch (error) {
      console.error("Error fetching podcast data:", error);
      throw error;
    }
  }

  async getPodcastFeed(sourceURL: string) {
    let response: Response;

    try {
      response = await fetch(sourceURL);

      if (!response.ok) {
        throw new Error("CORS error or other network issue");
      }

      const rss = await response.text();
      return RssParser.parse(rss);
    } catch (error) {
      console.warn("Error fetching directly:", error);
      try {
        console.log("Attempting to fetch using CORS bypass...");

        response = await bypassCorsService.fetchBypassingCors(sourceURL);
        const rss = await response.text();
        return RssParser.parse(rss);
      } catch (bypassError) {
        console.error("Error fetching with CORS bypass:", bypassError);
        throw bypassError;
      }
    }
  }
}

export const podcastsService = new PodcastsService();

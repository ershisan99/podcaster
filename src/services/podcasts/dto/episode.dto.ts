import { Episode } from "../podcasts.types";

export class EpisodeDto {
  id: number;
  releaseDate: string;
  audioUrl: string;
  title: string;
  durationSeconds: number;

  constructor(episode: Episode) {
    this.id = episode.trackId;
    this.title = episode.trackName;
    this.releaseDate = episode.releaseDate;
    this.audioUrl = episode.episodeUrl;
    this.durationSeconds = episode.trackTimeMillis / 1000;
  }
}

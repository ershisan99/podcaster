import { Entry } from "./podcasts.types";

export class PodcastDTO {
  id: string;
  title: string;
  author: string;
  imageUrl: string;

  constructor(podcast: Entry) {
    this.id = podcast.id.attributes["im:id"];
    this.title = podcast["im:name"].label;
    this.author = podcast["im:artist"].label;
    this.imageUrl = podcast["im:image"][0].label;
  }
}

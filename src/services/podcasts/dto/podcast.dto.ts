import { Entry, ImImage } from "../podcasts.types";

export class PodcastDTO {
  id: string;
  title: string;
  author: string;
  images: { small: string; medium: string; large: string };
  description: string;

  constructor(podcast: Entry) {
    this.id = podcast.id.attributes["im:id"];
    this.title = podcast["im:name"].label;
    this.author = podcast["im:artist"].label;
    this.description = podcast["summary"].label;
    this.images = this.convertImages(podcast["im:image"]);
  }

  private convertImages(images: ImImage[]) {
    const sortedImages = [...images].sort((a, b) => {
      return parseInt(a.attributes.height) - parseInt(b.attributes.height);
    });

    return {
      small: sortedImages[0].label,
      medium: sortedImages[1].label,
      large: sortedImages[2].label,
    };
  }
}

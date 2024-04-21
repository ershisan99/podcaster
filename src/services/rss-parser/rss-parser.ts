import { RssEpisode, RssPodcast } from "./rss-parser.types";

export class RssParser {
  public static parse(rss: string): RssPodcast {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rss, "text/xml");

    const channel = xmlDoc.querySelector("channel");
    const description = this.getElementInnerHtml(channel, "description");

    const episodes: RssEpisode[] = [];

    const items = Array.from(xmlDoc.querySelectorAll("item"));

    items.forEach((item) => {
      const id = this.getElementInnerHtml(item, "guid").replace(/\//g, "-");
      const releaseDate = this.getElementInnerHtml(item, "pubDate");
      const audioUrl =
        this.getElementByTagName(item, "enclosure")?.getAttribute("url") ?? "";

      const episodeTitle = this.getElementInnerHtml(item, "title");

      const durationSeconds = this.parseDuration(
        this.getElementInnerHtml(item, "itunes:duration") ?? "0",
      );

      const episodeDescription =
        this.getElementInnerHtml(item, "content:encoded") ??
        this.getElementInnerHtml(item, "description");

      episodes.push({
        id,
        releaseDate,
        audioUrl,
        title: episodeTitle,
        durationSeconds,
        description: episodeDescription,
      });
    });

    return {
      description,
      episodes,
    };
  }

  public static parseDuration(durationStr: string): number {
    if (durationStr.includes(":")) {
      const parts = durationStr.split(":").map((part) => parseInt(part, 10));
      let seconds = 0;
      if (parts.length === 3) {
        seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
      } else if (parts.length === 2) {
        seconds = parts[0] * 60 + parts[1];
      } else if (parts.length === 1) {
        seconds = parts[0];
      }
      return seconds;
    } else {
      return parseInt(durationStr, 10);
    }
  }

  public static getElementByTagName(element: Element | null, tagName: string) {
    return element?.getElementsByTagName(tagName)[0];
  }

  public static getElementInnerHtml(element: Element | null, tagName: string) {
    return this.cleanCDATA(
      this.getElementByTagName(element, tagName)?.innerHTML ?? "",
    );
  }

  public static cleanCDATA(data?: string) {
    if (!data) {
      return "";
    }

    return data.replace("<![CDATA[", "").replace("]]>", "");
  }
}

export interface Episode {
  id: string;
  releaseDate: string;
  audioUrl: string;
  title: string;
  durationSeconds: number;
  description: string;
}

export interface Podcast {
  description: string;
  episodes: Episode[];
}

export class RssParser {
  public static parse(rss: string): Podcast {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rss, "text/xml");

    const channel = xmlDoc.querySelector("channel");
    const description = this.getElementInnerHtml(channel, "description");

    const episodes: Episode[] = [];

    const items = Array.from(xmlDoc.querySelectorAll("item"));

    items.forEach((item) => {
      const id = this.getElementInnerHtml(item, "guid");
      const releaseDate = this.getElementInnerHtml(item, "pubDate");
      const audioUrl =
        this.getElementByTagName(item, "enclosure")?.getAttribute("url") ?? "";

      const episodeTitle = this.getElementInnerHtml(item, "title");

      const durationSeconds = parseInt(
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

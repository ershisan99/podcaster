import { Link, useParams } from "react-router-dom";
import { Wrap } from "./wrap";

type Props = {
  title: string;
  author: string;
  description: string;
  imageURL: string;
};

export function PodcastInfoCard({
  title,
  author,
  description,
  imageURL,
}: Props) {
  const { episodeId, podcastId } = useParams<{
    episodeId?: string;
    podcastId?: string;
  }>();

  const href = `/podcast/${podcastId}`;
  const shouldWrapWithLink = !!episodeId;

  return (
    <aside className={"h-fit w-1/3 px-2 py-6 shadow-md"}>
      <div className={"border-b px-10 pb-4"}>
        <Wrap if={shouldWrapWithLink} with={Link} wrapperProps={{ to: href }}>
          <img src={imageURL} alt={title} />
        </Wrap>
      </div>
      <div className={"border-b px-2 py-4"}>
        <Wrap if={shouldWrapWithLink} with={Link} wrapperProps={{ to: href }}>
          <strong className={"block"}>{title}</strong>
          <em className={"text-sm"}>by {author}</em>
        </Wrap>
      </div>
      <div>
        <strong className={"text-sm"}>Description:</strong>
        <div
          className={"text-sm italic"}
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </aside>
  );
}

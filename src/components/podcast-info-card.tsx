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
    <div>
      <Wrap if={shouldWrapWithLink} with={Link} wrapperProps={{ to: href }}>
        <img src={imageURL} alt={title} />
      </Wrap>
      <Wrap if={shouldWrapWithLink} with={Link} wrapperProps={{ to: href }}>
        <h1>{title}</h1>
        <h2>{author}</h2>
      </Wrap>
      <p>{description}</p>
    </div>
  );
}

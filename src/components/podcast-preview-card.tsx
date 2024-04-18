import { Link } from "react-router-dom";

type Props = {
  title: string;
  author: string;
  imageUrl: string;
  detailUrl: string;
};

export function PodcastPreviewCard({
  title,
  author,
  imageUrl,
  detailUrl,
}: Props) {
  return (
    <Link to={detailUrl}>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <h4>{author}</h4>
    </Link>
  );
}

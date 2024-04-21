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
    <Link to={detailUrl} className={"w-full"}>
      <div className={"relative -mb-12 mt-12 h-full p-3 pt-12 shadow-md"}>
        <img
          src={imageUrl}
          alt={title}
          className={
            "absolute -top-12 left-2/4  h-24 w-24 -translate-x-1/2 rounded-full object-cover"
          }
        />
        <h3
          className={
            "text-md mt-2 text-center font-semibold uppercase tracking-tight"
          }
        >
          {title}
        </h3>
        <h4 className={"mt-2 text-center text-sm text-slate-500"}>
          Author: {author}
        </h4>
      </div>
    </Link>
  );
}

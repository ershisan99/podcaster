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
  return (
    <div>
      <h1>{title}</h1>
      <h2>{author}</h2>
      <img src={imageURL} alt={title} />
      <p>{description}</p>
    </div>
  );
}

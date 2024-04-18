type Props = {
  title: string;
  author: string;
  imageUrl: string;
};

export function PodcastPreviewCard({ title, author, imageUrl }: Props) {
  return (
    <div>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <h4>{author}</h4>
    </div>
  );
}

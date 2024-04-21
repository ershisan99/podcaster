import { Link, useParams } from "react-router-dom";
import { usePodcastQuery } from "../services/podcasts/podcast.hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "./ui/table/table";
import { useTitle } from "../hooks/use-title";

export function PodcastEpisodesList() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { data: podcast } = usePodcastQuery(podcastId);
  useTitle(podcast?.title ?? "Podcast");

  return (
    <div>
      <div className={"p-3 text-xl font-bold shadow-md"}>
        Episodes: {podcast?.trackCount}
      </div>
      <div className={"mt-6 p-3 shadow-md"}>
        <Table>
          <TableHead>
            <TableRow className={"!bg-slate-50"}>
              <TableHeadCell className={"text-start"}>Title</TableHeadCell>
              <TableHeadCell className={"text-start"}>Date</TableHeadCell>
              <TableHeadCell className={"text-end"}>Duration</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {podcast?.episodes?.map((episode) => {
              const formattedDate = formatDate(episode.releaseDate);
              const formattedDuration = formatDuration(episode.durationSeconds);
              const url = `/podcast/${podcastId}/episode/${episode.id}`;

              return (
                <TableRow key={episode.id}>
                  <TableCell>
                    <Link
                      to={url}
                      className={"text-indigo-500 hover:underline"}
                    >
                      {episode.title}
                    </Link>
                  </TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell className={"text-end"}>
                    {formattedDuration}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function formatDuration(duration?: number) {
  if (!duration) {
    return "N/A";
  }
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-ES", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

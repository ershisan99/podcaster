import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../ui";
import { formatDate, formatDuration } from "../../utils";
import { Link } from "react-router-dom";
import { RssEpisode } from "../../services/rss-parser";

type Props = {
  episodes: RssEpisode[] | undefined;
};

export const PodcastEpisodesTable = memo(({ episodes }: Props) => {
  return (
    <Table className={"w-full"}>
      <TableHead>
        <TableRow className={"!bg-slate-50"}>
          <TableHeadCell>Title</TableHeadCell>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell className={"text-end"}>Duration</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {episodes?.map((episode) => {
          const formattedDate = formatDate(episode.releaseDate);
          const dateTime = new Date(episode.releaseDate).toISOString();
          const formattedDuration = formatDuration(episode.durationSeconds);
          const url = `episode/${episode.id}`;

          return (
            <TableRow key={episode.id}>
              <TableCell>
                <Link to={url} className={"text-indigo-500 hover:underline"}>
                  {episode.title}
                </Link>
              </TableCell>
              <TableCell>
                <time dateTime={dateTime}>{formattedDate}</time>
              </TableCell>
              <TableCell className={"text-end"}>{formattedDuration}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
});

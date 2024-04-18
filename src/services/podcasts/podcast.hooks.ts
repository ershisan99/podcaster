import { useQuery } from "@tanstack/react-query";
import { podcastsService } from "./podcasts.service";

const QUERY_KEYS = {
  TOP_PODCASTS: "podcasts/top",
} as const;

export function useTopPodcastsQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.TOP_PODCASTS],
    queryFn: () => podcastsService.getTopPodcasts(),
  });
}

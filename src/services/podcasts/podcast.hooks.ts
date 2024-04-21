import { useQuery } from "@tanstack/react-query";
import { podcastsService } from "./podcasts.service";

const QUERY_KEYS = {
  TOP_PODCASTS: "podcasts/top",
  PODCAST_EPISODES: "podcasts/episodes",
} as const;

export function useTopPodcastsQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.TOP_PODCASTS],
    queryFn: ({ signal }) => podcastsService.getTopPodcasts({ signal }),
  });
}

export function usePodcastQuery(podcastId?: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.PODCAST_EPISODES, podcastId],
    queryFn: ({ signal }) =>
      podcastsService.getPodcastById(podcastId ?? "", { signal }),
    enabled: !!podcastId,
  });
}

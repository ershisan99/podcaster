import { useQuery } from "@tanstack/react-query";
import { podcastsService } from "./podcasts.service";

const QUERY_KEYS = {
  TOP_PODCASTS: "podcasts/top",
  PODCAST_EPISODES: "podcasts/episodes",
} as const;

export function useTopPodcastsQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.TOP_PODCASTS],
    queryFn: () => podcastsService.getTopPodcasts(),
  });
}

export function usePodcastQuery(podcastId?: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.PODCAST_EPISODES, podcastId],
    queryFn: () => podcastsService.getPodcastById(podcastId ?? ""),
    enabled: !!podcastId,
  });
}

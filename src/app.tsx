import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Router } from "./router";
import { createIDBPersister } from "./services/infrastructure";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});
const persister = createIDBPersister();

export function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <Router />
    </PersistQueryClientProvider>
  );
}

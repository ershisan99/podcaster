import { Router } from "./router";
import { QueryClient } from "@tanstack/react-query";
import { createIDBPersister } from "./services/infrastructure/persisters/create-idb-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

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

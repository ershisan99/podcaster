import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { Podcast } from "./pages/podcast";
import { Episode } from "./components/episode";
import { PodcastEpisodesList } from "./components/podcast/podcast-episodes-list";
import { Layout } from "./components/ui/layout/layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/podcast",
        element: <Podcast />,
        children: [
          {
            path: ":podcastId",
            element: <PodcastEpisodesList />,
          },
          {
            path: ":podcastId/episode/:episodeId",
            element: <Episode />,
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

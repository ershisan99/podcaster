import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { Podcast } from "./pages/podcast";
import { PodcastEpisodesList, Episode, Layout } from "./components";

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

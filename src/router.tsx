import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import { Podcast } from "./pages/podcast";
import { Episode } from "./pages/episode";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/podcast/:podcastId",
    element: <Podcast />,
  },
  {
    path: "/podcast/:podcastId/episode/:episodeId",
    element: <Episode />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

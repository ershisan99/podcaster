import { Link, Outlet } from "react-router-dom";
import { Spinner } from "./spinner";
import { useIsFetching } from "@tanstack/react-query";

export function Layout() {
  const fetching = useIsFetching();
  const isLoading = fetching > 0;

  return (
    <div className={"p-6 mx-auto max-w-screen-lg"}>
      <header className={"flex items-center justify-between"}>
        <h1>
          <Link to={"/"}>Podcaster</Link>
        </h1>
        {isLoading && <Spinner />}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

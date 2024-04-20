import { Link, Outlet } from "react-router-dom";
import { Spinner } from "./spinner";
import { useIsFetching } from "@tanstack/react-query";

export function Layout() {
  const fetching = useIsFetching();
  const isLoading = fetching > 0;

  return (
    <div className={"mx-auto max-w-screen-lg p-6"}>
      <header
        className={
          "mb-4 flex items-center justify-between border-b border-b-slate-400 py-2"
        }
      >
        <h1 className={"text-2xl font-semibold text-sky-600"}>
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

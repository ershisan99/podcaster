import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className={""}>
      <h1 className={"hidden text-center text-2xl font-bold"}>404 :(</h1>
      <p className={"hidden text-center text-xl"}>Page not found</p>
      <img
        src={"https://http.cat/images/404.jpg"}
        alt={
          "A cat trying to hide under some napkins with a text saying 404 not found"
        }
        className={"mx-auto w-full max-w-sm"}
      />
      <Link
        className={"mt-4 block text-center text-blue-500 underline"}
        to={"/"}
      >
        Try going back home
      </Link>
    </div>
  );
}

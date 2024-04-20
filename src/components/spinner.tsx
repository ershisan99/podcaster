import s from "./spinner.module.css";

export function Spinner() {
  return <span className={s.loader} aria-busy={"true"}></span>;
}

import { useCallback, useEffect, useState } from "react";

export function useQuery<T, E = Error>(
  callback: () => Promise<T>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
  dependencies: any[] = [],
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<E | undefined>();
  const [data, setData] = useState<T | undefined>();

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    callback()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, dependencies);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, data };
}

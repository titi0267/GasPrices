import {HOST} from '@env';

const fetchGeoCodingResults = async (
  body: {adress: string},
  setResults: (value: {label: string; value: string}[]) => void,
  setLoading: (value: boolean) => void,
  abortController: React.MutableRefObject<AbortController>,
) => {
  abortController.current.abort();

  const newAbortController = new AbortController();
  const signal = newAbortController.signal;

  // Update the reference to the new AbortController
  abortController.current = newAbortController;
  setLoading(true);

  const res = await fetch(`${HOST}/geoCoding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) throw Error('Error on geocoding services');
  const resolve = await res.json();
  const values = resolve.map((obj: any) => ({
    label: obj.label,
    value: obj.geometry.join(','),
  }));
  setLoading(false);

  setResults(values);
};

export default fetchGeoCodingResults;

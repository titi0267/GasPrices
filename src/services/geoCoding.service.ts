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
  console.log('search query', body.adress);

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
  console.log(resolve);
  const values = resolve.map((obj: any) => ({
    label: obj.label,
    value: obj.geometry.join(','),
  }));
  console.log('found query', values[0]);
  setLoading(false);

  setResults(values);
};

export default fetchGeoCodingResults;

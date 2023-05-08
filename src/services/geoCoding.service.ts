import {HOST} from '@env';

const fetchGeoCodingResults = async (
  body: {adress: string},
  loading: any,
  setLoading: (value: any) => void,
) => {
  const res = await fetch(`${HOST}/geoCoding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw Error('Error on geocoding services');
  const resolve = await res.json();

  setLoading(resolve);
};

export default fetchGeoCodingResults;

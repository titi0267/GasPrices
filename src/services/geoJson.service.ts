import {HOST} from '@env';

const fetchGeoJsonResults = async (
  body: {
    start: string;
    end: string;
  },
  setData: (value: any) => void,
) => {
  const res = await fetch(`${HOST}/geoJson`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw Error('Error on open  services');
  const resolve = await res.json();

  setData(resolve[0]);
};

export default fetchGeoJsonResults;

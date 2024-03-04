import {HOST} from '@env';

const fetchGeoJsonResults = async (
  body: {
    start: string;
    end: string;
  },
  setData: (value: any) => void,
  setIsLoading: (value: boolean) => void,
) => {
  console.log(body);
  const res = await fetch(`${HOST}/geoJson`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  try {
    if (!res.ok) throw Error('Error on osrm services');
    const resolve = await res.json();
    setData(resolve[0]);
  } catch (e) {
    setIsLoading(false);
  }
};

export default fetchGeoJsonResults;

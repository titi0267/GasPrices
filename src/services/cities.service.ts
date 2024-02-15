import {HOST} from '@env';
import {CityPosition} from '../Types';

const fetchCityNames = async (
  body: {adress: string},
  setResults: (value: string[]) => void,
  setLoading: (value: boolean) => void,
) => {
  setLoading(true);
  console.log('build');
  const res = await fetch(`${HOST}/cityName`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw Error('Error on city name data');
  const resolve: string[] = await res.json();
  resolve.sort((a, b) => a.localeCompare(b));
  const results = resolve.map(city => {
    return city.charAt(0).toUpperCase() + city.slice(1);
  });

  setLoading(false);

  setResults(results);
};

const fetchCityPosition = async (
  body: {adress: string},
  setPosition: (value: {label: string; geometry: string}) => void,
) => {
  const res = await fetch(`${HOST}/cityData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw Error('Error on city position data');
  const resolve: CityPosition = await res.json();
  setPosition(resolve);
};

export {fetchCityNames, fetchCityPosition};

import {HOST} from '@env';

const fetchGasStationList = async (body: {code_department: string}) => {
  const res = await fetch(`${HOST}/gasStations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw Error('Error on gas station services');

  return res;
};

export default fetchGasStationList;

import {HOST} from '@env';

const fetchDepartmentCode = async (body: {coords: [number, number]}) => {
  const res = await fetch(`${HOST}/geoCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw Error('Error on Geo services');

  return res;
  // console.log(resolve);
  // if (data == null) {
  //   setData([resolve]);
  //   console.log('new ' + resolve);
  //   return;
  // }
  // if (!data.includes(resolve)) {
  //   setData((array: any) => [...array, resolve]);
  //   console.log('add ' + resolve);
  // }
};

export default fetchDepartmentCode;

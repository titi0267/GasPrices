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
  console.log(res.ok);
  const resolve = await res.json();
  //   let uniqueChars: any = [];
  //   resolve.forEach((c: any) => {
  //     if (!uniqueChars.includes(c.id)) {
  //       uniqueChars.push(c);
  //     }
  //   });
  //   console.log(uniqueChars);
  setLoading(resolve);
};

export default fetchGeoCodingResults;

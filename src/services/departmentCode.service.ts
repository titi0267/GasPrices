import Config from 'react-native-config';

const fetchDepartmentCode = async (body: {
  coords: number[];
}): Promise<string> => {
  const res = await fetch(`${Config.HOST}/geoCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw Error('Error on Geo services');

  const resolve = await res.text();

  return resolve.toString();
};

const departementsCodes = async (
  geoJson: {geometry: {coordinates: [number[]]}},
  setDepartementCode: (code: string[]) => void,
) => {
  const code = [];
  for (let i = 0; i < geoJson.geometry.coordinates.length; i += 500) {
    const position = geoJson.geometry.coordinates[i];
    if (position) {
      code.push(await fetchDepartmentCode({coords: position}));
    }
  }
  code.push(
    await fetchDepartmentCode({
      coords:
        geoJson.geometry.coordinates[geoJson.geometry.coordinates.length - 1],
    }),
  );

  setDepartementCode([...new Set(code)]);
};

export default {fetchDepartmentCode, departementsCodes};

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

  const resolve = await res.json();

  return resolve.records;
};

const gasStations = async (
  codes: string[],
  setGasStations: (value: any[]) => void,
) => {
  const gasStations = [];
  for (let i = 0; i < codes.length; i += 1) {
    console.log(codes[i]);
    gasStations.push(
      await fetchGasStationList({code_department: codes[i].toString()}),
    );
  }

  setGasStations(gasStations);
};

// Function to calculate Haversine distance between two coordinates
function haversineDistance(itinerayCoords: number[], stationCoords: any) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat =
    (stationCoords.geometry.coordinates[0] - itinerayCoords[0]) *
    (Math.PI / 180);
  const dLon =
    (stationCoords.geometry.coordinates[1] - itinerayCoords[1]) *
    (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(itinerayCoords[0] * (Math.PI / 180)) *
      Math.cos(stationCoords.geometry.coordinates[0] * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function findStationsInRange(
  itineraryCoords: number[],
  stationsCoords: any[any],
) {
  return stationsCoords.filter(
    (stationCoords: any) =>
      haversineDistance(itineraryCoords, stationCoords) <= 10,
  );
}

export default {fetchGasStationList, gasStations, findStationsInRange};

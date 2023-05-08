import {useEffect} from 'react';

const RefineGasStations = (props: {
  itinerary: any;
  gasStations: any;
  setRefineGasStations: (value: any) => void;
}) => {
  useEffect(() => {
    if (props.gasStations && props.itinerary) {
      const myData: any[] = [];
      const increment =
        Math.round(props.itinerary.geometry.coordinates.length / 10) == 0
          ? 1
          : Math.round(props.itinerary.geometry.coordinates.length / 10);
      for (let i = 0; i < props.gasStations.length; i++) {
        for (let j = 0; j < props.gasStations[i].nhits; j++) {
          for (let d = 0; d < increment; d++) {
            if (
              (props.itinerary.geometry.coordinates[d * 10][0] + 0.05).toFixed(
                3,
              ) >= props.gasStations[i].records[j].geometry.coordinates[0] &&
              (props.itinerary.geometry.coordinates[d * 10][0] - 0.05).toFixed(
                3,
              ) <= props.gasStations[i].records[j].geometry.coordinates[0]
            ) {
              if (
                (
                  props.itinerary.geometry.coordinates[d * 10][1] + 0.05
                ).toFixed(3) >=
                  props.gasStations[i].records[j].geometry.coordinates[1] &&
                (
                  props.itinerary.geometry.coordinates[d * 10][1] - 0.05
                ).toFixed(3) <=
                  props.gasStations[i].records[j].geometry.coordinates[1]
              ) {
                if (!myData.includes(props.gasStations[i].records[j])) {
                  myData.push(props.gasStations[i].records[j]);
                }
              }
            }
          }
        }
      }
      props.setRefineGasStations(myData);
    }
  }, [props.gasStations]);
};

export default RefineGasStations;

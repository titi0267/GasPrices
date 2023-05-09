import MapboxGl from '@rnmapbox/maps';
import {View} from 'react-native';
import {useEffect} from 'react';

const Point = (props: {gasStation: any}) => {
  return (
    <MapboxGl.PointAnnotation
      id={props.gasStation.recordid}
      key={props.gasStation.recordid}
      coordinate={props.gasStation.geometry.coordinates}>
      <View
        style={{
          height: 30,
          width: 30,
          backgroundColor: '#00cccc',
          borderRadius: 50,
          borderColor: '#fff',
          borderWidth: 3,
        }}
      />
    </MapboxGl.PointAnnotation>
  );
};

const renderPoints = (props: {refineGasStations: any[]}) => {
  const points = [];

  if (props.refineGasStations) {
    for (let i = 0; i < props.refineGasStations.length; i++) {
      points.push(Point({gasStation: props.refineGasStations[i]}));
    }
  }
  return points;
};

const Points = (props: {refineGasStations: any[]}) => {
  return renderPoints({refineGasStations: props.refineGasStations});
};
export default Points;

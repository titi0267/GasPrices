import {Image, View} from 'react-native';
import Mapbox from '@rnmapbox/maps';

import {useEffect} from 'react';

const Point = (props: {gasStation: any}) => {
  return (
    <View>
      <Mapbox.PointAnnotation
        id={props.gasStation.recordid}
        key={props.gasStation.recordid}
        coordinate={props.gasStation.geometry.coordinates}>
        <Image
          source={require('../../../../../assets/gas-pump.png')}
          style={{width: 17, height: 17}}></Image>
      </Mapbox.PointAnnotation>
    </View>
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

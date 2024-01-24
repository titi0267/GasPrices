import Mapbox from '@rnmapbox/maps';
import {useRef} from 'react';
import {Image, View} from 'react-native';

const Markers = (props: {stations: any[]}) => {
  const {stations} = props;
  return stations.length != 0 ? (
    stations.map(station => {
      return (
        <Mapbox.PointAnnotation
          id={station.recordid}
          key={station.recordid}
          coordinate={station.geometry.coordinates}>
          <Image
            source={require('../../../src/assets/gas-pump.png')}
            style={{width: 17, height: 17}}></Image>
        </Mapbox.PointAnnotation>
      );
    })
  ) : (
    <></>
  );
};

export default Markers;

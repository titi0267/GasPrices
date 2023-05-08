import {HOST} from '@env';
import {View, Text} from 'react-native';
import Map from './Map';
import {Camera} from '@rnmapbox/maps';
import {useEffect, useRef, useState} from 'react';
import Itinerary from './Itinerary';

const Home = ({route}: any) => {
  const camera = useRef<Camera>();

  useEffect(() => {
    camera.current?.setCamera({
      centerCoordinate: [2.2137, 46.2276],
      animationDuration: 0,
      zoomLevel: 3.5,
    });
  }, []);

  if (route.params && route.params.start && route.params.end) {
    return (
      <View>
        <Map
          camera={camera}
          start={route.params.start.geometry}
          end={route.params.end.geometry}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Map camera={camera} start={null} end={null} />
      </View>
    );
  }
};

export default Home;

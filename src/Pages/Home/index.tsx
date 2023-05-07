import {HOST} from '@env';
import {View, Text} from 'react-native';
import Map from './Map';
import {Camera} from '@rnmapbox/maps';
import {useEffect, useRef, useState} from 'react';

const Home = () => {
  const camera = useRef<Camera>();

  useEffect(() => {
    camera.current?.setCamera({
      centerCoordinate: [2.2137, 46.2276],
      animationDuration: 0,
      zoomLevel: 3.5,
    });
  }, []);
  return (
    <View>
      <Map camera={camera} />
    </View>
  );
};

export default Home;

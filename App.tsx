import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabBarNavigation from './src/Navigation';
import {MAPBOX_API_KEY} from '@env';
import MapboxGl from '@rnmapbox/maps';

const App = (): JSX.Element => {
  MapboxGl.setWellKnownTileServer('Mapbox');
  MapboxGl.setAccessToken(MAPBOX_API_KEY);
  MapboxGl.setConnected(true);

  return (
    <NavigationContainer>
      <TabBarNavigation />
    </NavigationContainer>
  );
};

export default App;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigation from './Navigation/BottomTabNavigator';

const App = (): JSX.Element => {
  // MapboxGl.setWellKnownTileServer('Mapbox');
  // MapboxGl.setAccessToken(MAPBOX_API_KEY);
  // MapboxGl.setConnected(true);

  return (
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  );
};

export default App;

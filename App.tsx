import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabBarNavigation from './src/Navigation';

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <TabBarNavigation />
    </NavigationContainer>
  );
};

export default App;

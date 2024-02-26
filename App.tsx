import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigation from './src/Navigation/RootStackNavigator';
import updateApp from './src/services/updateApp.service';
import {Button, Linking, StyleSheet, Text, View} from 'react-native';

const App = (): JSX.Element => {
  const [version, setVersion] = useState(false);
  useEffect(() => {
    updateApp(setVersion);
  }, []);
  return (
    <>
      {version ? (
        <View style={styles.updateContainer}>
          <Text style={styles.text}>
            Il semblerait que votre application ne soit pas à jour !
          </Text>
          <Button
            title="Mettre à jour"
            onPress={() => {
              Linking.openURL('market://details?id=com.opticarbu');
            }}
          />
        </View>
      ) : (
        <NavigationContainer>
          <RootStackNavigation />
        </NavigationContainer>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  updateContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '80%',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
  },
});

export default App;

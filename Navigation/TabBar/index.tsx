import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import {NavigationState} from '@react-navigation/native';

const Items = ({state, navigation}: CustomTabBarProps) => {
  const items = [];
  const buttons = ['Map', 'Search', 'GasPumps'];
  const iconPaths = [
    require('../../src/assets/home.png'),
    require('../../src/assets/search.png'),
    require('../../src/assets/gas-pump.png'),
  ];
  const labels = ['Carte', 'Recherche', 'Stations'];
  const currentRouteName = state.routeNames[state.index];

  for (let i = 0; i < buttons.length; i++) {
    items.push(
      <TouchableOpacity
        key={i}
        style={{
          maxWidth: '30%',
          width: '30%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate(buttons[i]);
        }}>
        <Image
          source={iconPaths[i]}
          style={
            styles(currentRouteName == buttons[i] ? '#00A19B' : '#565F64').image
          }></Image>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: currentRouteName == buttons[i] ? '#00A19B' : '#565F64',
          }}>
          {labels[i]}
        </Text>
      </TouchableOpacity>,
    );
  }
  return items;
};

interface CustomTabBarProps {
  state: NavigationState;
  navigation: any;
}
const TabBar = ({state, navigation}: CustomTabBarProps) => {
  return (
    <View style={styles().separator}>
      <View style={styles().container}>{Items({state, navigation})}</View>
    </View>
  );
};

const styles = (tintColor?: string) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 50,
      width: '100%',
      justifyContent: 'space-evenly',
      backgroundColor: '#C8CCCE',
    },
    image: {
      width: 23,
      tintColor: tintColor,
      height: 23,
    },
    separator: {
      borderTopWidth: 0.5,
      backgroundColor: '#565F64',
    },
  });

export default TabBar;

//Black: #000000
//Silver: #C8CCCE
//Dark gray: #565F64
//tiff green: #00A19B
//white: #FFFFFF

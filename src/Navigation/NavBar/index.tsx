import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NavigationAssets from '../../AssetsImport/NavigationAssets/NavigationAssets';
import {useEffect} from 'react';

const NavBar = ({navigation}: any) => {
  if (
    navigation.getState().routes.find(route => route.name == 'Home')?.params
      .isLoading
  ) {
    return <></>;
  }

  return (
    <View
      style={{
        height: 60,
        width: '100%',
      }}>
      <View
        style={{
          flex: 3,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 2,
          backgroundColor: '#D3D3D3',
        }}>
        <TouchableOpacity
          style={[styles.buttons]}
          onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.image}
            source={NavigationAssets.find(id => id.id == 'home')?.asset}
          />
          <Text style={{}}>Acceuil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons]}
          onPress={() => navigation.navigate('Search')}>
          <Image
            style={styles.image}
            source={NavigationAssets.find(id => id.id == 'search')?.asset}
          />
          <Text style={{}}>Recherche</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons]}
          onPress={() => navigation.navigate('Table')}>
          <Image
            style={styles.image}
            source={NavigationAssets.find(id => id.id == 'table')?.asset}
          />
          <Text style={{}}>Tableau</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    maxWidth: '100%',
  },
});

export default NavBar;

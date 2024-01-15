import {StyleSheet, Text, View} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import {JAWG_API_KEY} from '@env';
import {useEffect, useRef, useState} from 'react';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

MapLibreGL.setAccessToken(null);

const Map = () => {
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  const [zoomLevel, setZoomLevel] = useState(15);
  const mapRef = useRef<MapLibreGL.MapView>(null);

  const getLocation = async () => {
    try {
      const permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      if (permissionStatus === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            console.log(latitude, longitude);
            setLocation({latitude, longitude});
          },
          error => {
            console.error(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.warn('Location permission denied');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.page}>
      <MapLibreGL.MapView
        style={styles.map}
        ref={mapRef}
        logoEnabled={false}
        attributionEnabled={false}
        styleURL={`https://tile.jawg.io/jawg-streets.json?access-token=${JAWG_API_KEY}`}>
        <MapLibreGL.Camera
          centerCoordinate={[location.longitude, location.latitude]}
          zoomLevel={mapRef.current ? zoomLevel : 0}></MapLibreGL.Camera>
      </MapLibreGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default Map;

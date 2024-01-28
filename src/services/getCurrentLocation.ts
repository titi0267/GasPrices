import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request} from 'react-native-permissions';

const getLocation = async (
  setLocationCallback: (
    value: string | {latitude: number; longitude: number},
  ) => void,
  typeToSet: 'string' | 'object',
) => {
  try {
    const permissionStatus = await request(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (permissionStatus === 'granted') {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          if (typeToSet == 'string')
            setLocationCallback(`${latitude},${longitude}`);
          else setLocationCallback({latitude, longitude});
        },
        error => {
          console.error(error);
        },
        {enableHighAccuracy: false, timeout: 15000},
      );
    } else {
      console.warn('Location permission denied');
    }
  } catch (error) {
    console.error(error);
  }
};

export default getLocation;

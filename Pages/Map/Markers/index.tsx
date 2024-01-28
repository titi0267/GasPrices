import Mapbox from '@rnmapbox/maps';
import {useEffect, useRef} from 'react';
import {
  Alert,
  Image,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomCard from '../../../Components/Card';
import {GasPump, GasPumpFields} from '../../../Types';

const Markers = (props: {
  stations: GasPump[] | null;
  setInfos: (value: {
    adress: string;
    coords: [number, number];
    gasType: string;
    price: string;
  }) => void;
  gasType: string;
  setIsModalVisible: (value: boolean) => void;
}) => {
  const {stations, setInfos, setIsModalVisible, gasType} = props;

  const gradientColors = stations?.map((_, index) => {
    const factor = index / (stations.length - 1);

    const red = Math.round(0 + factor * (255 - 0));
    const green = Math.round(128 - factor * (128 - 0));
    const blue = 0;

    const color = `rgb(${red}, ${green}, ${blue})`;
    return color;
  });
  const field = gasType.toLowerCase() + '_prix';

  return stations && stations.length != 0 ? (
    stations.map((station, index) => {
      return (
        <Mapbox.MarkerView
          id={station.recordid}
          key={station.recordid}
          coordinate={station.geometry.coordinates}>
          <TouchableOpacity
            onPress={() => {
              setInfos({
                adress: station.fields.ville,
                coords: station.geometry.coordinates,
                gasType: gasType,
                price: (station.fields as GasPumpFields)[
                  field as 'e10_prix'
                ] as string,
              });
              setIsModalVisible(true);
            }}>
            <LinearGradient
              key={index}
              colors={[
                gradientColors ? gradientColors[index] : 'green',
                gradientColors ? gradientColors[index] : 'red',
              ]}
              style={{
                width: 17,
                height: 17,
                borderRadius: 10,
                overflow: 'hidden',
                margin: 10,
              }}>
              <Image
                source={require('../../../src/assets/gas-pump.png')}
                style={{width: 17, height: 17, tintColor: 'white'}}></Image>
            </LinearGradient>
          </TouchableOpacity>
        </Mapbox.MarkerView>
      );
    })
  ) : (
    <></>
  );
};

export default Markers;

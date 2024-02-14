import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {JAWG_API_KEY, MAPBOX_API_KEY} from '@env';
import {useEffect, useRef, useState} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import getLocation from '../../services/getCurrentLocation';
import {GasPump, GasType, LocationType, MapRouteParams} from '../../Types';
import fetchGeoJsonResults from '../../services/geoJson.service';
import Mapbox from '@rnmapbox/maps';
import Markers from './Markers';
import departmentCodeService from '../../services/departmentCode.service';
import gasStationsService from '../../services/gasStations.service';
import asyncStorageService from '../../services/asyncStorage.service';
import CustomCard from '../../Components/Card';
import CustomModal from '../../Components/Modal';

Mapbox.setAccessToken(MAPBOX_API_KEY);

const Map = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const {start, end} = route.params as MapRouteParams;
  const [location, setLocation] = useState<LocationType>({
    latitude: 0,
    longitude: 0,
  });
  const [zoomLevel, setZoomLevel] = useState(15);
  const [geoJson, setGeoJson] = useState<{
    geometry: {coordinates: [number[]]};
  }>();

  const mapRef = useRef<Mapbox.MapView>(null);
  const [gasStations, setGasStations] = useState<any[]>([]);
  const [refinedStations, setRefinedStations] = useState<GasPump[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [departmentCodes, setDepartmentCodes] = useState<string[]>([]);
  const [gasType, setGasType] = useState<GasType | null>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [infos, setInfos] = useState<{
    adress: string;
    coords: [number, number];
    gasType: string;
    price: string;
  }>();

  const setLocationCallback = (value: LocationType | string) => {
    setLocation(value as LocationType);
  };

  const setDepartmentCodesCallback = (value: string[]) => {
    setDepartmentCodes(value);
  };

  const setGasStationsCallback = (value: any[]) => {
    setGasStations(value);
  };

  useEffect(() => {
    asyncStorageService.getGasType(setGasType);
  }, [isFocused]);

  useEffect(() => {
    if (start && end) {
      setIsLoading(true);
      setRefinedStations(null);
      fetchGeoJsonResults(
        {
          start: start,
          end: end,
        },
        setGeoJson,
      );
    } else {
      setIsLoading(false);
    }
  }, [start, end]);

  useEffect(() => {
    if (start && end) {
      const startSplit = start.split(',');

      setZoomLevel(9);
      setLocation({
        latitude: parseFloat(startSplit[1]),
        longitude: parseFloat(startSplit[0]),
      });
    }
    if (geoJson) {
      departmentCodeService.departementsCodes(
        geoJson,
        setDepartmentCodesCallback,
      );
    }
  }, [geoJson]);

  useEffect(() => {
    getLocation(setLocationCallback, 'object');
  }, []);

  useEffect(() => {
    gasStationsService.gasStations(departmentCodes, setGasStationsCallback);
  }, [departmentCodes]);

  useEffect(() => {
    if (gasStations.length != 0 && geoJson && gasType) {
      const itineraryCoords = [];
      for (let i = 0; i < geoJson.geometry.coordinates.length; i += 100) {
        if (geoJson.geometry.coordinates[i] != undefined)
          itineraryCoords.push(geoJson.geometry.coordinates[i]);
      }
      itineraryCoords.push(
        geoJson.geometry.coordinates[geoJson.geometry.coordinates.length - 1],
      );
      const refinedStations = [];
      let gasStationsCopy = JSON.parse(JSON.stringify(gasStations));
      for (let d = 0; d < gasStationsCopy.length; d += 1) {
        for (let i = 0; i < itineraryCoords.length; i += 1) {
          const stationToAdd = gasStationsService.findStationsInRange(
            itineraryCoords[i],
            gasStationsCopy[d],
          );
          refinedStations.push(...stationToAdd);
          gasStationsCopy[d] = gasStationsCopy[d].filter(
            (station: GasPump) =>
              !stationToAdd.some(
                (station2: GasPump) => station.recordid === station2.recordid,
              ),
          );
        }
      }

      let filterStations = refinedStations.filter((station: GasPump) =>
        station.fields?.carburants_disponibles?.toLowerCase().includes(gasType),
      );

      filterStations = filterStations.sort(
        (a: GasPump, b: GasPump) =>
          parseFloat(
            a.fields[(gasType.toLowerCase() + '_prix') as 'e10_prix'],
          ) -
          parseFloat(b.fields[(gasType.toLowerCase() + '_prix') as 'e10_prix']),
      );

      setRefinedStations(filterStations);
    }
  }, [gasStations, gasType]);

  useEffect(() => {
    if (refinedStations) {
      asyncStorageService.storeData('gasPumps', refinedStations as any[]);
      setIsLoading(false);
    }
    if (!refinedStations && end && start) {
      setIsLoading(true);
    }
  }, [refinedStations, end, start]);

  return (
    <View style={styles.page}>
      <Mapbox.MapView
        style={styles.map}
        ref={mapRef}
        logoEnabled={false}
        attributionEnabled={false}
        styleURL={`https://tile.jawg.io/jawg-streets.json?access-token=${JAWG_API_KEY}`}>
        {isLoading == false || (!end && !start) ? (
          <Mapbox.Camera
            centerCoordinate={[location.longitude, location.latitude]}
            zoomLevel={mapRef.current ? zoomLevel : 0}></Mapbox.Camera>
        ) : (
          <></>
        )}
        {geoJson && (
          <Mapbox.ShapeSource
            id="source"
            shape={geoJson as unknown as GeoJSON.Geometry}>
            <Mapbox.LineLayer
              id="line"
              style={{lineColor: 'blue', lineWidth: 3}}
            />
          </Mapbox.ShapeSource>
        )}

        {isLoading == false &&
          Markers({
            stations: refinedStations,
            setInfos: setInfos,
            gasType: gasType ?? 'e10',
            setIsModalVisible: setIsModalVisible,
          })}
      </Mapbox.MapView>
      {isLoading == true && (
        <ActivityIndicator
          size={50}
          style={{position: 'absolute', zIndex: 100}}></ActivityIndicator>
      )}
      <CustomModal isVisible={isModalVisible} setVisible={setIsModalVisible}>
        <CustomCard
          address={infos?.adress ?? 'Error'}
          coords={infos?.coords ?? [0, 0]}
          gasType={infos?.gasType ?? 'Error'}
          price={infos?.price ?? 'Error'}></CustomCard>
      </CustomModal>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        style={{top: 100}}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
            }}
            style={{
              width: 30,
              height: 30,
              alignSelf: 'flex-end',
              marginRight: 35,
              top: 33,
              zIndex: 10,
            }}>
            <Image
              source={require('../../assets/close.png')}
              style={{
                width: 30,
                height: 30,
              }}></Image>
          </TouchableOpacity>
          <CustomCard
            address={infos?.adress ?? 'Error'}
            coords={infos?.coords ?? [0, 0]}
            gasType={infos?.gasType ?? 'Error'}
            price={infos?.price ?? 'Error'}></CustomCard>
        </View>
      </Modal> */}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});

export default Map;

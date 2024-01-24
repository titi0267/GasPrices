import {StyleSheet, View} from 'react-native';
import {JAWG_API_KEY, MAPBOX_API_KEY} from '@env';
import {useEffect, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import getLocation from '../../src/services/getCurrentLocation';
import {LocationType, MapRouteParams} from '../../Types';
import fetchGeoJsonResults from '../../src/services/geoJson.service';
import Mapbox from '@rnmapbox/maps';
import Markers from './Markers';
import departmentCodeService from '../../src/services/departmentCode.service';
import gasStationsService from '../../src/services/gasStations.service';

Mapbox.setAccessToken(MAPBOX_API_KEY);

const Map = () => {
  const route = useRoute();
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
  // const [isStationLoaded, setIsStationLoaded] = useState(false);
  const [refinedStations, setRefinedStations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentCodes, setDepartmentCodes] = useState<string[]>([]);

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
    if (start && end) {
      fetchGeoJsonResults(
        {
          start: start,
          end: end,
        },
        setGeoJson,
      );
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
    console.log(departmentCodes);
    gasStationsService.gasStations(departmentCodes, setGasStationsCallback);
  }, [departmentCodes]);

  useEffect(() => {
    if (gasStations.length != 0 && geoJson) {
      const itineraryCoords = [];
      for (let i = 0; i < geoJson.geometry.coordinates.length; i += 100) {
        if (geoJson.geometry.coordinates[i] != undefined)
          itineraryCoords.push(geoJson.geometry.coordinates[i]);
      }
      itineraryCoords.push(
        geoJson.geometry.coordinates[geoJson.geometry.coordinates.length - 1],
      );

      const refinedStations = [];
      let gasStationsCopy = gasStations;
      for (let d = 0; d < gasStationsCopy.length; d += 1) {
        for (let i = 0; i < itineraryCoords.length; i += 1) {
          const stationToAdd = gasStationsService.findStationsInRange(
            itineraryCoords[i],
            gasStationsCopy[d],
          );
          refinedStations.push(...stationToAdd);
          gasStationsCopy[d] = gasStationsCopy[d].filter(
            (station: any) =>
              !stationToAdd.some(
                (station2: any) => station.recordid === station2.recordid,
              ),
          );
        }
      }
      setRefinedStations(refinedStations);
    }
  }, [gasStations]);

  return (
    <View style={styles.page}>
      <Mapbox.MapView
        style={styles.map}
        ref={mapRef}
        logoEnabled={false}
        attributionEnabled={false}
        styleURL={`https://tile.jawg.io/jawg-streets.json?access-token=${JAWG_API_KEY}`}>
        <Mapbox.Camera
          centerCoordinate={[location.longitude, location.latitude]}
          zoomLevel={mapRef.current ? zoomLevel : 0}></Mapbox.Camera>
        {geoJson ? (
          <Mapbox.ShapeSource
            id="source"
            shape={geoJson as unknown as GeoJSON.Geometry}>
            <Mapbox.LineLayer
              id="line"
              style={{lineColor: 'blue', lineWidth: 3}}
            />
          </Mapbox.ShapeSource>
        ) : (
          <></>
        )}
        {Markers({stations: refinedStations})}
      </Mapbox.MapView>
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

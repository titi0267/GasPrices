import MapboxGl, {Camera} from '@rnmapbox/maps';
import Itinerary from '../Itinerary';
import {useState, useEffect, useLayoutEffect} from 'react';
import goThroughItinerary from './DepartmentCodes';
import GasStations from './GasStations';
import Points from './GasStations/Points';
import RefineGasStations from './GasStations/Refine';
import {
  NavigationProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

const Map = (props: {camera: any; start: any; end: any}) => {
  const [departmentCodes, setDepartmentCodes] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<any>(null);
  const [gasStations, setGasStations] = useState<any[]>([]);
  const [refineGasStations, setRefineGasStations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<any, any>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('rerender');
    if (itinerary) {
      setIsLoading(true);
      goThroughItinerary({
        data: itinerary,
        setDepartmentCodes: setDepartmentCodes,
      });
    }
  }, [itinerary, isFocused]);
  useEffect(() => {
    if (departmentCodes) {
      GasStations({
        departmentCodes: departmentCodes,
        setGasStations: setGasStations,
        gasStations: gasStations,
      });
    }
  }, [departmentCodes]);
  RefineGasStations({
    itinerary: itinerary,
    gasStations: gasStations,
    setRefineGasStations: setRefineGasStations,
    setIsLoading: setIsLoading,
  });

  useEffect(() => {
    navigation.setParams({isLoading: isLoading});
    console.log('loading at ' + isLoading);
  }, [isLoading, navigation]);

  useEffect(() => {
    if (refineGasStations) {
      navigation.setParams({refineGasStations: refineGasStations});
    }
  }, [refineGasStations]);

  return (
    <MapboxGl.MapView
      style={{height: '100%', width: '100%'}}
      rotateEnabled={false}>
      <Camera
        ref={props.camera.current}
        centerCoordinate={[2.2137, 46.2276]}
        animationDuration={0}
        zoomLevel={3.5}
      />
      <Itinerary
        start={props.start}
        end={props.end}
        itinerary={itinerary}
        setItinerary={setItinerary}
        setDepartmentCodes={setDepartmentCodes}
      />
      {Points({refineGasStations: refineGasStations})}
    </MapboxGl.MapView>
  );
};

export default Map;

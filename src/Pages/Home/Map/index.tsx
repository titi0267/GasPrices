import MapboxGl, {Camera} from '@rnmapbox/maps';
import Itinerary from '../Itinerary';
import {useState, useEffect} from 'react';
import goThroughItinerary from './DepartmentCodes';
import GasStations from './GasStations';

const Map = (props: {camera: any; start: any; end: any}) => {
  const [departmentCodes, setDepartmentCodes] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<any>(null);
  const [gasStations, setGasStations] = useState<any[]>([]);

  useEffect(() => {
    if (itinerary) {
      goThroughItinerary({
        data: itinerary,
        setDepartmentCodes: setDepartmentCodes,
      });
    }
  }, [itinerary]);
  useEffect(() => {
    if (departmentCodes) {
      console.log(departmentCodes);

      GasStations({
        departmentCodes: departmentCodes,
        setGasStations: setGasStations,
        gasStations: gasStations,
      });
    }
  }, [departmentCodes]);
  useEffect(() => {
    console.log(gasStations);
  }, [gasStations]);
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
    </MapboxGl.MapView>
  );
};

export default Map;

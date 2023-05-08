import MapboxGl, {Camera} from '@rnmapbox/maps';
import Itinerary from '../Itinerary';
import {useState, useEffect} from 'react';
import goThroughItinerary from './DepartmentCodes';

const Map = (props: {camera: any; start: any; end: any}) => {
  const [departmentCodes, setDepartmentCodes] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<any>(null);

  useEffect(() => {
    if (itinerary) {
      goThroughItinerary({
        data: itinerary,
        setDepartmentCodes: setDepartmentCodes,
      });
    }
  }, [itinerary]);
  useEffect(() => {
    console.log(departmentCodes);
  }, [departmentCodes]);
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

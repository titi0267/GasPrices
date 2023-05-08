import MapboxGl, {Camera} from '@rnmapbox/maps';
import Itinerary from '../Itinerary';
import {useState, useEffect} from 'react';
import goThroughItinerary from './DepartmentCodes';
import GasStations from './GasStations';

const Map = (props: {camera: any; start: any; end: any}) => {
  const [departmentCodes, setDepartmentCodes] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<any>(null);
  const [gasStations, setGasStations] = useState<any[]>([]);
  const [refineGasStations, setRefineGasStations] = useState<any[]>([]);

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
    if (gasStations && itinerary) {
      const myData: any[] = [];
      const increment = Math.round(itinerary.geometry.coordinates.length / 100);
      for (let i = 0; i < gasStations.length; i++) {
        for (let j = 0; j < gasStations[i].nhits; j++) {
          for (let d = 0; d < increment; d++) {
            if (
              itinerary.geometry.coordinates[d * increment][0] + 0.03 >=
                gasStations[i].records[j].geometry.coordinates[0] &&
              itinerary.geometry.coordinates[d * increment][0] - 0.03 <=
                gasStations[i].records[j].geometry.coordinates[0]
            ) {
              if (
                itinerary.geometry.coordinates[d * increment][1] + 0.03 >=
                  gasStations[i].records[j].geometry.coordinates[1] &&
                itinerary.geometry.coordinates[d * increment][1] - 0.03 <=
                  gasStations[i].records[j].geometry.coordinates[1]
              ) {
                console.log(gasStations[i].records[j]);
                myData.push(gasStations[i].records[j]);
              }
            }
          }
        }
      }
      setRefineGasStations(myData);
    }
  }, [gasStations]);
  useEffect(() => {
    console.log(refineGasStations);
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
    </MapboxGl.MapView>
  );
};

export default Map;

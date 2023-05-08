import {useEffect, useState} from 'react';
import fetchGeoJsonResults from '../../../services/geoJson.service';
import MapboxGl from '@rnmapbox/maps';
import fetchDepartmentCode from '../../../services/departmentCode.service';
import goThroughItinerary from '../Map/DepartmentCodes';

const Itinerary = (props: {
  start: any;
  end: any;
  itinerary: any;
  setItinerary: (value: any) => void;
  setDepartmentCodes: (value: any) => void;
}) => {
  useEffect(() => {
    if (props.start && props.end && props.start != null && props.end != null) {
      props.setDepartmentCodes([]);
      fetchGeoJsonResults(
        {
          start: props.start[0].toString() + ',' + props.start[1].toString(),
          end: props.end[0].toString() + ',' + props.end[1].toString(),
        },
        props.setItinerary,
      );
    }
  }, [props.start, props.end]);

  if (props.itinerary) {
    return (
      <MapboxGl.ShapeSource id="source" shape={props.itinerary}>
        <MapboxGl.LineLayer
          id="line"
          style={{lineColor: 'blue', lineWidth: 3}}
        />
      </MapboxGl.ShapeSource>
    );
  } else {
    return <></>;
  }
};
export default Itinerary;

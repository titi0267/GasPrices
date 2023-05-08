import {useEffect, useState} from 'react';
import fetchGeoJsonResults from '../../../services/geoJson.service';
import MapboxGl, {Camera} from '@rnmapbox/maps';

const Itinerary = (props: {start: any; end: any}) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (props.start && props.end && props.start != null && props.end != null) {
      fetchGeoJsonResults(
        {
          start: props.start[0].toString() + ',' + props.start[1].toString(),
          end: props.end[0].toString() + ',' + props.end[1].toString(),
        },
        setData,
      );
    }
  }, [props.start, props.end]);

  if (data) {
    return (
      <MapboxGl.ShapeSource id="source" shape={data}>
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

import {useEffect, useState} from 'react';
import fetchGeoJsonResults from '../../../services/geoJson.service';
import MapboxGl from '@rnmapbox/maps';
import fetchDepartmentCode from '../../../services/departmentCode.service';

const goThroughItinerary = async (props: {
  data: any;
  setDepartmentCodes: (value: string[]) => void;
}) => {
  const myData: string[] = [];
  let interval = 100;
  let dataToCheck = props.data.geometry.coordinates.length / 100;
  if (dataToCheck > 10) {
    dataToCheck = dataToCheck / 2;
    interval /= 2;
    console.log(interval);
  }
  console.log(dataToCheck);

  if (dataToCheck <= 1) {
    const resStart = await fetchDepartmentCode({
      coords: props.data.geometry.coordinates[0],
    });
    const resEnd = await fetchDepartmentCode({
      coords:
        props.data.geometry.coordinates[
          props.data.geometry.coordinates.length - 1
        ],
    });

    const dataResultStart = await resStart.json();
    const dataResultEnd = await resEnd.json();
    if (!myData.includes(dataResultStart)) {
      myData.push(dataResultStart);
    }
    if (!myData.includes(dataResultEnd)) {
      myData.push(dataResultEnd);
    }
  } else {
    for (let i = 0; i < dataToCheck; i++) {
      const res = await fetchDepartmentCode({
        coords: props.data.geometry.coordinates[i * interval],
      });
      if (!res.ok) {
        continue;
      }
      try {
        const dataResult = await res.json();
        if (!myData.includes(dataResult)) {
          myData.push(dataResult);
        }
      } catch (e) {}
    }
  }
  props.setDepartmentCodes(myData);
};

const Itinerary = (props: {start: any; end: any}) => {
  const [data, setData] = useState<any>(null);
  const [departmentCodes, setDepartmentCodes] = useState<string[]>([]);

  useEffect(() => {
    if (props.start && props.end && props.start != null && props.end != null) {
      setDepartmentCodes([]);
      fetchGeoJsonResults(
        {
          start: props.start[0].toString() + ',' + props.start[1].toString(),
          end: props.end[0].toString() + ',' + props.end[1].toString(),
        },
        setData,
      );
    }
  }, [props.start, props.end]);

  useEffect(() => {
    if (data) {
      goThroughItinerary({data: data, setDepartmentCodes: setDepartmentCodes});
    }
  }, [data]);

  useEffect(() => {
    console.log(departmentCodes);
  }, [departmentCodes]);

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

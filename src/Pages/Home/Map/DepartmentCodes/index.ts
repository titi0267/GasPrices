import fetchDepartmentCode from '../../../../services/departmentCode.service';

const goThroughItinerary = async (props: {
  data: any;
  setDepartmentCodes: (value: string[]) => void;
}) => {
  const myData: string[] = [];
  let interval = 100;
  let dataToCheck = props.data.geometry.coordinates.length / 100;
  if (dataToCheck > 10) {
    dataToCheck = dataToCheck / 2;
    interval *= 2;
  }

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
        return;
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

export default goThroughItinerary;
